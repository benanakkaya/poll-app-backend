import Poll from "../models/pollModel.js";



export const addPoll = async (req,res) => {

    const {title,choices,expiresDate,category} = req.body;

    const pollControl = await Poll.findOne({title});

    if(pollControl){
        return res.status(400).json({message:"Zaten aktif böyle bir anket var!"})
    }

    const createdPoll = await Poll.create({
        title,
        choices,
        expiresDate,
        category
    })

    return res.status(201).json({message:"Anket başarıyla oluşturuldu!", poll: createdPoll});
}


export const votePoll = async (req,res) => {

    const {pollID,choiceID} = req.body;

    try {
        const result = await Poll.findByIdAndUpdate(
          pollID,
          { $inc: { 'choices.$[choice].voteCount': 1 } },
          { arrayFilters: [{ 'choice._id': choiceID }] }
        );
        res.status(200).json({ message: 'Oy verildi' });
      } catch (error) {
        res.status(500).json({ message: 'Oy verme hatası: ' + error.message });
      }

}

export const fetchLastPolls = async (req,res) => {

    const latestPolls = await Poll.find().sort({ createdAt: -1 }).limit(3);

    return res.status(200).json({polls: latestPolls});
}

export const fetchAllPolls = async (req,res) => {

    const allPolls = await Poll.find().sort({createdAt: -1});

    return res.status(200).json({polls: allPolls});
}

export const fetchPollResult = async (req,res) => {
    const {pollID} = req.body;

    const targetPoll = await Poll.findById(pollID);

    return res.status(200).json({results:targetPoll})
}