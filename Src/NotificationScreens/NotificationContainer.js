import { connect } from 'react-redux'
import Notification from './Notification'
import { bindActionCreators } from 'redux'
import * as NotificationActions from './Actions'
import * as AppActions from '../Action'

const mapStateToProps = state => ({
    notificationReducer: state.notificationReducer
})

const mapDispatchToProps = dispatch => ({
    notificationActions: bindActionCreators(NotificationActions, dispatch),
    appActions: bindActionCreators(AppActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);