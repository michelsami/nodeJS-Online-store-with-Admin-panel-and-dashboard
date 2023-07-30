import mongoose from "mongoose"

export const connectionDB = async ()=>{



	try {
		const connection = await mongoose.connect(process.env.DB_URI);
		console.log(`data connected done with host : ${connection.connection.host}`)
		
	} catch (error) {
		console.log(`data not connected with error ${error}`)
	}
}