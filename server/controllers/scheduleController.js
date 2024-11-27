const { Team, Ballpark, Schedule } = require("../models");

const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find()
            .populate('homeTeam', 'teamName teamLogo')
            .populate('awayTeam', 'teamName teamLogo')
            .populate('ballpark', 'ballparkName'); 

        if (!schedules || schedules.length === 0) {
            return res.status(404).json({ message: "No schedules found." });
        }

        res.json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ message: error.message });
    }
};

const getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id)
            .populate('homeTeam', 'teamName teamLogo')
            .populate('awayTeam', 'teamName teamLogo')
            .populate('ballpark', 'ballparkName') 
            .select('gameDate ballpark homeTeam awayTeam'); 

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found!" });
        }
        
        res.json(schedule);
    } catch (error) {
        console.error(`Error fetching schedule with ID ${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }
};

const createSchedule = async (req, res) => {
    const { gameDate, gameTime, homeTeam, awayTeam, ballpark } = req.body;

    try {
        if (!gameDate || !gameTime || !homeTeam || !awayTeam || !ballpark) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newSchedule = new Schedule({
            gameDate,
            gameTime,
            homeTeam,
            awayTeam,
            ballpark
        });

        await newSchedule.save();

        res.status(201).json(newSchedule);
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ message: error.message });
    }
};

const deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);
        
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found!" });
        }

        res.status(200).json({ message: "Schedule deleted successfully." });
    } catch (error) {
        console.error(`Error deleting schedule with ID ${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    deleteSchedule, 
};
