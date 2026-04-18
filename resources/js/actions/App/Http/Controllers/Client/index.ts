import ReservationsController from './ReservationsController'
import SupportController from './SupportController'
const Client = {
    ReservationsController: Object.assign(ReservationsController, ReservationsController),
SupportController: Object.assign(SupportController, SupportController),
}

export default Client