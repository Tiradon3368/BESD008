const express = require('express');
const router = express.Router();
const connection = require('./mysql');

router.get('/list', (req, res) => {
    connection.query('SELECT * FROM online_course', (err, result) =>{
        if (err) {
            console.error(err);
            res.status(400).json({error: err})
        } else {
            res.status(200).json({data: result});
        }
    })
})

router.get('/search/:id', (req, res) => {
    const courseId = req.params.id;
    connection.query('SELECT * FROM online_course WHERE course_id = ?', [courseId], (err, result) =>{
        if (err) {
            console.error(err);
            res.status(400).json({error: err})
        } else {
            if (result.length > 0) {
                res.status(200).json({result: 1, data: result})
            } else {
                res.status(200).json({result: 0});
            }
        }
    })
})

router.get('/promote', (req, res) => {
    connection.query('SELECT * FROM online_course WHERE promote = ?', 1, (err, result) =>{
        if (err) {
            console.error(err);
            res.status(400).json({error: err})
        } else {
            if (result.length > 0) {
                res.status(200).json({result: 1, data: result})
            } else {
                res.status(200).json({result: 0});
            }
        }
    })
})

router.post('/create', (req, res) => {
    const course = req.body;
    connection.query('INSERT INTO `online_course` (`course_id`, `title`, `description`, `duration`, `lecturer`, `category`, `promote`, `course_image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [course.course_id, course.title, course.description, course.duration, course.lecturer, course.category, course.promote, course.course_image
        ], (err, result) => { 
            if (err) {
                console.error(err);
                res.status(400).json({error: err})
            } else {
                res.status(201).json({result: 1})
            }
        });
})

router.put('/update/:id', (req, res) => {
    const courseId = req.params.id
    const course = req.body

    connection.query('UPDATE `online_course` SET `title` = ?, `description` = ?, `duration` = ?, `lecturer` = ?, `category` = ?, `promote` = ?, `course_image` = ? WHERE `online_course`.`course_id` = ?', 
        [course.title, course.description, course.duration, course.lecturer, course.category, course.promote, course.course_image, courseId], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({error: err}); 
            } else {
                if (result.changedRows > 0) {
                    res.status(200).json({result: result.changedRows});
                } else {
                    res.status(404).json({result: result.changedRows});
                }
            }
        }
    );
});

router.delete('/delete/:id', (req, res) => {
    const courseId = req.params.id;
    connection.query('DELETE FROM online_course WHERE course_id = ?', [courseId], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({error: err});
            } else {
                if (result.affectedRows > 0) {
                    res.status(204).json({result: result.affectedRows});
                } else {
                    res.status(404).json({result: result.affectedRows});
                }
            }
        });
});

router.get('/', function(req, res){
    res.send('GET route on user.');
});

//export this router to use in our index.js
module.exports = router;