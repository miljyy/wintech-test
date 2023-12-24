import React, { Component } from "react";
import ActivityDataService from "../services/activity.service";
import { Link } from "react-router-dom";

export default class ActivitiesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveActivities = this.retrieveActivities.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveActivity = this.setActiveActivity.bind(this);
    this.removeAllActivities = this.removeAllActivities.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      activities: [],
      currentActivity: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveActivities();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveActivities() {
    ActivityDataService.getAll()
      .then(response => {
        this.setState({
          activities: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveActivities();
    this.setState({
      currentActivity: null,
      currentIndex: -1
    });
  }

  setActiveActivity(activity, index) {
    this.setState({
      currentActivity: activity,
      currentIndex: index
    });
  }

  removeAllActivities() {
    ActivityDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
    
    ActivityDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          activities: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, activities, currentActivity, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Activities List</h4>

          <ul className="list-group">
            {activities &&
              activities.map((activity, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveActivity(activity, index)}
                  key={index}
                >
                  {activity.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllActivities}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentActivity ? (
            <div>
              <h4>Activity</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentActivity.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentActivity.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentActivity.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/activities/" + currentActivity.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an activity...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}