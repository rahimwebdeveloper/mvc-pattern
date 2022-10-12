let count = 0;

const viewCount = (req, res, next) => {
    count++;
    console.log(count);
    // res.send("count add successfully add ")
    next();
};

module.exports = viewCount;