import { connect } from "react-redux";
import Catalog from "../components/Catalog/Catalog";
import { bindActionCreators } from "redux";
import * as ShirtActions from "../actions";

const mapStateToProps = function(state) {
  var updatedProps = {
    shirts: state.shirts.shirtList,
    fetchingShirts: state.shirts.fetchingShirts
  };
  return updatedProps;
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ShirtActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
