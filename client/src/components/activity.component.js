import React, { Component } from "react";
import ActivityDataService from "../services/activity.service";
import { withRouter } from '../common/with-router';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getActivity = this.getActivity.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateActivity = this.updateActivity.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);

    this.state = {
      currentActivity: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getActivity(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentActivity: {
          ...prevState.currentActivity,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentActivity: {
        ...prevState.currentActivity,
        description: description
      }
    }));
  }

  getActivity(id) {
    ActivityDataService.get(id)
      .then(response => {
        this.setState({
          currentActivity: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentActivity.id,
      title: this.state.currentActivity.title,
      description: this.state.currentActivity.description,
      published: status
    };

    ActivityDataService.update(this.state.currentActivity.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentActivity: {
            ...prevState.currentActivity,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateActivity() {
    ActivityDataService.update(
      this.state.currentActivity.id,
      this.state.currentActivity
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The activity was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteActivity() {    
    ActivityDataService.delete(this.state.currentActivity.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/activities');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentActivity } = this.state;

    return (
      <div>
        {currentActivity ? (
          <div className="edit-form">
            <h4>Activity</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentActivity.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentActivity.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentActivity.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentActivity.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteActivity}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateActivity}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an activity...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Activity);