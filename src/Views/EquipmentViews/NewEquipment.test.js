import { render } from "@testing-library/react";
import { BrowserRouter} from "react-router-dom";
import { NewEquipment } from "./NewEquipment";

test('Does the NewEquipment component render successfully', async()=>{
    render(
        <BrowserRouter>
            <NewEquipment/>
        </BrowserRouter>
    );
})