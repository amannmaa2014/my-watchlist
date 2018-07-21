import React, { Component } from 'react';
import './WatchList.css';

class WatchList extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleCheck(e,id){
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.props.updateWatchListItemStatus(id,value);
    }

    handleComplete(e,id){
        this.props.updateWatchListItemStatus(id,1);
    }

    handleReset(e,id){
        this.props.updateWatchListItemStatus(id,0);
    }

    handleClose(e,id) {
        this.props.removeWatchListItem(id);
    }

    render() {
        const WatchList = this.props.WatchList;
        const listItems = [];
        const completedItems = [];

        WatchList.forEach((item) => {
            if(item.completed){
                completedItems.push(
                    <CompletedListItem 
                        key={item.id} 
                        id={item.id}
                        watchListItem={item.watchListItem}
                        handleClose={(e) => this.handleClose(e,item.id)} 
                        handleReset={(e) => this.handleReset(e,item.id)}
                    />
                );
            }else{
                listItems.push(
                    <WatchListItem 
                        key={item.id}
                        id={item.id} 
                        watchListItem={item.watchListItem}
                        handleClose={(e) => this.handleClose(e,item.id)} 
                        handleComplete={(e) => this.handleComplete(e,item.id)}
                    />
                );
            }
        });

        return (
            <div className="list-containers">
                { listItems.length === 0 ? (<h1 className="no-items">Add Movies or TV Shows to your Watch List</h1>) : null }
                    <div className="WatchList WatchList-container columns is-multiline">{listItems}</div>
                <hr />
                <ul className="CompletedList WatchList-element">{completedItems}</ul>
            </div>
        );
    }
}

class WatchListItem extends Component {

    render() {
        return (
            <div className="column WatchList-ListItem is-4">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-2by3">
                            <img src={this.props.watchListItem.Poster} alt={this.props.watchListItem.Title} />
                        </figure>
                    </div>
                    <div className="card-content ListItem-content">
                        <p className="ListItem-title">{this.props.watchListItem.Title}<span className="ListItem-year">({this.props.watchListItem.Year})</span></p>
                    </div>
                    <footer className="card-footer">
                        <div className="card-footer-button">
                            <span className="icon"><i className="fas fa-check"></i></span>
                            <span>Watched</span>
                        </div>
                        <div className="card-footer-button WatchList-Remove" onClick={this.props.handleClose}>
                            <span className="icon"><i className="fas fa-times-circle"></i></span>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

class CompletedListItem extends Component {
    render(){
        return (
            <li className="notification">
                <button className="delete WatchList-Remove" onClick={this.props.handleClose}></button>
                <article className="CompletedListItem-content">
                    <h3 className="ListItem-title">
                        {this.props.watchListItem.Title}
                    </h3>
                    <p className="buttons">
                        <button className="button WatchList-Reset" onClick={this.props.handleReset}>
                            <span className="icon"><i className="fas fa-undo"></i></span>
                            <span>Return to Watch List</span>
                        </button>
                    </p>
                </article>
            </li>
        );
    }
}

export default WatchList;