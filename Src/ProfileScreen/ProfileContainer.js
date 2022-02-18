import { connect } from 'react-redux'
import Profile from './Profile'
import { bindActionCreators } from 'redux'
import * as ProfileActions from './Actions'

const mapStateToProps = state => ({
    profileReducer: state.profileReducer
})

const mapDispatchToProps = dispatch => ({
    profileActions: bindActionCreators(ProfileActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);