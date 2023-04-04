import { NextApiRequest, NextApiResponse } from "next";
import  supabase  from "../../lib/supabaseClient";
import {IProject} from "@/store/slices/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IProject[] | { message: string }>
) {
    if (req.method === "GET") {
        const { profileId, searchValue } = req.query;
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .contains("users", [profileId])
            .ilike("title", `%${searchValue}%`);
        console.log(data, 'api')
        if (error) {
            console.error("Error fetching projects:", error);
            return res.status(500).json({ message: "Error fetching projects" });
        }

        if (!data?.length) {
            return res.status(404).json({ message: "Projects not found" });
        }

        const projects: IProject[] = data as IProject[];
        return res.status(200).json(projects);
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}

