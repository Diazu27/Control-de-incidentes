import { render } from "@testing-library/react";
import { BrowserRouter} from "react-router-dom";
import { Equipments } from "../src/Views/EquipmentViews/Equipments";

test('Does the Equipments component render successfully', async()=>{
    render(
        <BrowserRouter>
            <Equipments/>
        </BrowserRouter>
    );
})