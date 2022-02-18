import { connect } from 'react-redux'
import SocialDetail from './SocialDetail'
import { bindActionCreators } from 'redux'
import * as SocialActions from './Actions'

const mapStateToProps = state => ({
    socialReducer: state.socialReducer
})

const mapDispatchToProps = dispatch => ({
    socialActions: bindActionCreators(SocialActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialDetail);