class message{
    constructor(message,content=null){
        var arr =message.split(',')
        this.first_id=arr[0]
        this.second_id=arr[1]
        this.type=arr[2]
        this.content=content
    }
}
module.exports = message;
