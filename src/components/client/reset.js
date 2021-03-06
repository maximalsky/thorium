import {Component} from "react";
import gql from "graphql-tag.macro";
import {withApollo} from "react-apollo";
import playSound from "../generic/SoundPlayer";
import {publish} from "helpers/pubsub";

const CACHE_INVALID_SUB = gql`
  subscription ClearCache($client: ID!) {
    clearCache(client: $client)
  }
`;
const excludedStations = ["Sound", "Blackout", "Viewscreen", "Keyboard"];

class ResetCache extends Component {
  componentDidMount() {
    this.cacheSub = this.props.client
      .subscribe({
        query: CACHE_INVALID_SUB,
        variables: {
          client: this.props.clientId,
        },
      })
      .subscribe({
        next: ({loading}) => {
          if (!loading) {
            // Reset all of the sounds that are currently playing
            this.props.removeAllSounds();
            if (
              excludedStations.indexOf(this.props.station.name) > -1 ||
              (this.props.station.cards &&
                this.props.station.cards.find(
                  c => excludedStations.indexOf(c.component) > -1,
                ))
            )
              return;
            this.props.playSound({url: "/sciences.ogg"});
            this.props.reset && this.props.reset();
            publish("widgetClose");
          }
        },
        error(err) {
          console.error("Error resetting cache", err);
        },
      });
  }
  componentWillUnmount() {
    this.cacheSub && this.cacheSub.unsubscribe();
  }
  render() {
    return null;
  }
}

export default playSound(withApollo(ResetCache));
