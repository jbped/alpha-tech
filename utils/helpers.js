module.exports = {
    format_truncate: (text, length) => {
        if (!length) {
            return text
        } else if(text.length > length) {
            const post = (text.substring(0, length) + "...")
            return post
        }
        return text
    },
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
    },
    format_plural: (word, amount) => {
        if (amount !== 1){
            return `${word}s`
        }
        return word;
    }
}