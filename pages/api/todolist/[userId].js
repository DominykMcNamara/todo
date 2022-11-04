import { supabase } from "../../../lib/supabaseClient";

export const handler = async({ query: {userId}}, res) => {
    try {
        const todolist = await supabase.from('todos').select('name, id, user_id, completed').match({ user_id: userId})
        if(todolist) {
            res.status(200).json(todolist)
        } else {
            res.status(404).json({ message: `Todo list belonging to a user with the id of ${ userId } cannot be found`})
        }
    } catch (err) {
        console.log(err)
    }
}