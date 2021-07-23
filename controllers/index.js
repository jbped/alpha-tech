const router = require("express").Router();
const apiRoutes = require("./api");

// Routes for api routes folder
router.use("/api", apiRoutes);

// Returns 404 err if a non-existent endpoint is attempted
router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;