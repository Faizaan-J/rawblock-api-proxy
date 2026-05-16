const detailedUserInfo = (userId : number) => {
    const link = new URL(`https://users.roblox.com/v1/users/${userId}/`);
    return link;
}

export default detailedUserInfo;
