import { connect } from 'react-redux'
import Login from './Login'
import { bindActionCreators } from 'redux'
import * as AuthActions from './Actions'
import * as AppActions from '../Action'

const mapStateToProps = state => ({
    loginReducer: state.loginReducer
})

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(AuthActions, dispatch),
    appActions: bindActionCreators(AppActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);