import { connect } from 'react-redux'
import Ongoging from './Ongoging'
import { bindActionCreators } from 'redux'
import * as CampaignActions from './Actions'

const mapStateToProps = state => ({
    campaignReducer: state.campaignReducer
})

const mapDispatchToProps = dispatch => ({
    campaignActions: bindActionCreators(CampaignActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ongoging);