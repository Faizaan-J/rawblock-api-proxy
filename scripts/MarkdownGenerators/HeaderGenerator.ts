class HeaderGenerator {
    static generate(name: string, description: string, position: number = 0) : string {
        return [
            "---",
            `sidebar_position: ${position}`,
            "---",
            "",
            "import Tabs from '@theme/Tabs';",
            "import TabItem from '@theme/TabItem';",
            "",
            `# ${name}`,
            description
        ].join("\n");
    }
}

export default HeaderGenerator;
