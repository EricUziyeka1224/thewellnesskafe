import { connect } from 'react-redux'
import SignUp from './SignUp'
import { bindActionCreators } from 'redux'
import * as SignUpActions from './Actions'

const mapStateToProps = state => ({
    signUpReducer: state.signUpReducer
})

const mapDispatchToProps = dispatch => ({
    signUpActions: bindActionCreators(SignUpActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);