import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  Alert,
  PanResponder,
  Share
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = {
  postFavorite: campsiteId => postFavorite(campsiteId)
};

const shareCampsite = (title, message, url) => {
  Share.share(
    {
      title: title,
      message: `${title}: ${message} ${url}`,
      url: url
    },
    {
      dialogTitle: "Share " + title
    }
  );
};

function RenderCampsite(props) {
  const { campsite } = props;

  const recognizeDrag = ({ dx }) => (dx < -200 ? true : false);

  const view = React.createRef();

  const recognizeComment = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: (e, gesterState) => {
      {
        console.log("pan responder end", recognizeComment);
      }
    }
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + campsite.name + " to favorites?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => console.log("Cancel Pressed")
            },
            {
              text: "OK",
              onPress: () =>
                props.favorite
                  ? console.log("Already set as a favorite")
                  : props.markFavorite()
            }
          ],
          { cancelable: false }
        );
      }
      return true;
    }
  });

  if (campsite) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card
          featuredTitle={campsite.name}
          image={{ uri: baseUrl + campsite.image }}
        >
          <Text style={{ margin: 10 }}>{campsite.description}</Text>
          <Icon
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            raised
            reverse
            onPress={() =>
              props.favorite
                ? console.log("Already set as a favorite")
                : props.markFavorite()
            }
          />

          <Icon
            name={"share"}
            type="font-awesome"
            color="#5637DD"
            style={styles.cardItem}
            raised
            reversed
            onPress={() =>
              shareCampsite(
                campsite.name,
                campsite.description,
                baseUrl + campsite.image
              )
            }
          />

          <Icon
            style={styles.cardItem}
            name={props.pencil ? "pencil" : "pencil"}
            type="font-awesome"
            color="#5637DD"
            raisedreversed
            onPress={() => props.onShowModal()}
          />
        </Card>
      </Animatable.View>
    );
  }
  return <View />;
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };
  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      showModal: false,
      rating: 5,
      author: "",
      text: ""
    };
  }

  markFavorite(campsiteId) {
    this.props.postFavorite(campsiteId);
  }

  recognizeComment(campsiteId) {
    this.props.recognizeComment(campsiteId);
  }

  handleComment(campsiteId) {
    console.log(this.state.JSON.stringify(this.state));
    this.props.toggleModal(campsiteId);
  }

  resetForm() {
    this.setState({
      toggleModal: false
    });
  }

  static navigationOptions = {
    title: "Campsite Information"
  };

  render() {
    const campsiteId = this.props.navigation.getParam("campsiteId");
    const campsite = this.props.campsites.campsites.filter(
      campsite => campsite.id === campsiteId
    )[0];
    const comments = this.props.comments.comments.filter(
      comment => comment.campsiteId === campsiteId
    );

    return (
      <ScrollView>
        <RenderCampsite
          campsite={campsite}
          favorite={this.props.favorites.includes(campsiteId)}
          markFavorite={() => this.markFavorite(campsiteId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              startingValue="5"
              imageSize="40"
              onFinishRating={rating => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            ></Rating>
            <Input
              placeholder
              leftIcon="user-o"
              leftIconContainerStyle="padding-right=10"
              onChangeText="5"
              value
            >
              Author
            </Input>
            <Input
              placeholder
              leftIcon="comment-o"
              leftIconContainerStyle="padding-right=10"
              onChangeText="5"
              value
            >
              Comment
            </Input>
            <Button></Button>
            <Button
              onPress={() => {
                this.toggleModal();
              }}
              color="#808080"
              title="Cancel"
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20
  },
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  cardItem: {
    flex: 1,
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
