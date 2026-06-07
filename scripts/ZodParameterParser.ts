import * as zod from "zod";
import util from "node:util";

type ZodParsedField = {
        name: string;
        description: string;
        required: boolean;
        type: string;
        default?: any;
}

type ZodParsedResult = ZodParsedField[];

class ZodParameterParser {
    schema: zod.ZodObject;
    constructor(schema: zod.ZodObject) {
        this.schema = schema;
    }

    // idk adenosine triphosphate (atp)
    #extractSchemaInfoManually(schema: unknown) {
        let required = true;
        let defaultValue: unknown = undefined;
        let description = schema instanceof zod.ZodType && schema.description ? schema.description : "";

        while (
            schema instanceof zod.ZodDefault ||
            schema instanceof zod.ZodOptional ||
            schema instanceof zod.ZodNullable
        ) {
            if (schema instanceof zod.ZodDefault) {
                defaultValue = typeof schema.def.defaultValue === 'function' 
                    ? schema.def.defaultValue() 
                    : schema.def.defaultValue; // SUCKA DUCKA DHAKA BANGLADESH WHAT IS THIS 🤲
                required = false;
            }

            if (schema instanceof zod.ZodOptional) {
                required = false;
            }

            schema = schema.def.innerType;
        }

        return { required, defaultValue, schema, description };
    }

    #inferType(schema: any): string {
        if (schema instanceof zod.ZodString) return "string";
        if (schema instanceof zod.ZodNumber) {
            return schema.format?.includes("int") ? "int" : "number";
        }
        if (schema instanceof zod.ZodBoolean) return "boolean";
        if (schema instanceof zod.ZodEnum) return schema.options.join(" | ");
        if (schema instanceof zod.ZodPipe) {
            const input = schema.def.in;

            if (input instanceof zod.ZodEnum) {
                return input.options.join(" | ");
            }
            return this.#inferType(input);
        }

        return schema.constructor.name.replace("Zod", "").toLowerCase();
    }

    #runBackupParsingLogic(key: string, value: zod.ZodTypeAny, previousError?: any) {
        try {
            const { required, defaultValue, schema, description } = this.#extractSchemaInfoManually(value);
            const type = this.#inferType(schema);

            return {
                required,
                type,
                default: defaultValue,
                description
            }
        } catch (err: any) {
            console.error(`Failed to parse schema for ${key}. Previous error: ${previousError}`);
            console.error(`Backup parsing logic also failed for ${key}: `, err);
        }
    }

    #isRequired(schema: zod.ZodType): boolean {
        return !(
            schema instanceof zod.ZodOptional ||
            schema instanceof zod.ZodDefault
        );
    }

    parse() {
        const shape = this.schema.shape;
        const result = Object.entries(shape).map(([key, value]) => {
            try {
                const parsedToJSONSchema = value.toJSONSchema();
                const parsedField: ZodParsedField = {
                    name: key,
                    description: typeof parsedToJSONSchema.description === "string" ? parsedToJSONSchema.description : "",
                    required: this.#isRequired(value),
                    type: "unknown"
                };

                if (parsedToJSONSchema.hasOwnProperty("enum")) {
                    parsedField.type = parsedToJSONSchema.enum.join(" | ");
                } else if (typeof parsedToJSONSchema.type === "string") {
                    parsedField.type = parsedToJSONSchema.type;
                }

                if (parsedToJSONSchema.hasOwnProperty("default")) {
                    parsedField.default = parsedToJSONSchema.default;
                } else {
                    parsedField.default = undefined;
                }

                return parsedField;
            } catch (err: any) {
                const backupResult = this.#runBackupParsingLogic(key, value, err);
                if (!backupResult) {
                    console.error(`Failed to parse schema for ${key} using both primary and backup logic. Skipping this field.`);
                    return null;
                }
                const parsedField: ZodParsedField = {
                    name: key,
                    description: typeof backupResult.description === "string" ? backupResult.description : "",
                    required: typeof backupResult.required === "boolean" ? backupResult.required : true,
                    type: typeof backupResult.type === "string" ? backupResult.type : "unknown",
                    default: backupResult.default
                }
                
                return parsedField;
            }
        }).filter(field => field !== null) as ZodParsedResult; // NoLongerNull 😔

        return result;
    }
}

export default ZodParameterParser;
export type { ZodParsedField, ZodParsedResult as ZodParsedResult };
