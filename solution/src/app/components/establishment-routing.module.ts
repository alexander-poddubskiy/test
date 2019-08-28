import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EstablishmentListComponent, EstablishmentDetailsComponent } from "./index";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: "establishments", component: EstablishmentListComponent },
            { path: "establishment/:id", component: EstablishmentDetailsComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class EstablishmentRoutingModule { }
