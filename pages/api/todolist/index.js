import { supabase } from "../../../lib/supabaseClient";

const handler = async (req, res) => {
    const products = await supabase.from('todos').select('*')
    res.status(200).json(products)
}

export default handler