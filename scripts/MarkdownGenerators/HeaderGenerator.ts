class HeaderGenerator {
    static generate(name: string, description: string) {
        return [
            `### ${name}`,
            description
        ].join("\n");
    }
}

export default HeaderGenerator;
