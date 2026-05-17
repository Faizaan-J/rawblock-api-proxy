import URLCLass from "../classes/URLClass";

class DetailedUserInfoURL extends URLCLass {
    generate(userId: number) {
        const link = new URL(`https://users.roblox.com/v1/users/${userId}/`);
        return link;
    }
}

export default new DetailedUserInfoURL();
