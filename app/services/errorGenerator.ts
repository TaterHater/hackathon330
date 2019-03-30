export class ResponseError {
    ResponseError(){}
  createError = (messages: string[], errorNumber?: number) => {
    if (messages.length > 0 && messages != undefined) {
      let res: string = `{
            "ErrorMessage": ${messages},
            "ErrorNumber": ${errorNumber ? errorNumber : 0}
                }`;
      return JSON.stringify(res);
    }
    return JSON.stringify(`{
        "ErrorMessage": [],
        "ErrorNumber": 0
            }`);
  };
}
module.exports = ResponseError
