class SchematicProperty {
    type: string;
    nullable?: boolean;
    omittable?: boolean;
    example?: any;
    enum?: string[] | undefined;

    constructor(type: string, options?: { nullable?: boolean; example?: any; enum?: string[]; omittable?: boolean }) {
        this.type = type;
        if (options) {
            this.nullable = options.nullable ?? false;
            this.example = options.example ?? undefined;
            this.enum = options.enum;
            this.omittable = options.omittable ?? false;
        }
    }

    generateString(): string {
        let typeString = this.type;
        if (this.enum) {
            typeString = "enum(" + this.enum.join(" | ") + ")";
        }
        if (this.nullable) {
            typeString += " | null";
        }
        if (this.example) {
            typeString += ` / (example: ${this.example})`;
        }
        if (this.omittable === true) {
            typeString += " (may not be present)";
        }
        return typeString;
    }
}

export default SchematicProperty;
