function parseJwt(token) {
    try {
        console.log("token ", JSON.parse(atob(token.split('.')[1])));
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
export default parseJwt;