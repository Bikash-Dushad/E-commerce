module.exports.adminPage = async function(req, res){
    try {
        return res.render('adminPage')
    } catch (error) {
        console.log("error in admin page route", error)
        return res.redirect("back")
    }
}