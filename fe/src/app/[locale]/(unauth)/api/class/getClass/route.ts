import ConnectDB from "@/libs/DB";
import Class from "@/models/Class";

export const GET = async () => {
    try {
        await ConnectDB();


        const classes = await Class.find().populate({
            path: "boardIds",
            select: "name ",
        });

        return new Response(
            JSON.stringify({ message: "Classes fetched successfully", classes }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching classes:", error);
        return new Response(
            JSON.stringify({ message: "Server error", error: error.message }),
            { status: 500 }
        );
    }
};
