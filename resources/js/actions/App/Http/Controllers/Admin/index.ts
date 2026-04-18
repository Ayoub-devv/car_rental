import CarsController from './CarsController'
import ReservationsController from './ReservationsController'
import ClientsController from './ClientsController'
import PaymentsController from './PaymentsController'
import ReportsController from './ReportsController'
import SupportController from './SupportController'
const Admin = {
    CarsController: Object.assign(CarsController, CarsController),
ReservationsController: Object.assign(ReservationsController, ReservationsController),
ClientsController: Object.assign(ClientsController, ClientsController),
PaymentsController: Object.assign(PaymentsController, PaymentsController),
ReportsController: Object.assign(ReportsController, ReportsController),
SupportController: Object.assign(SupportController, SupportController),
}

export default Admin