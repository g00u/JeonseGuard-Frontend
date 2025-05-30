import React, { Component } from 'react';
import BoardService from '../services/BoardService';

class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preventionBoards: [],
      reportBoards: []
    };
  }

  

  componentDidMount() {
    BoardService.getBoards('prevention').then((res) => {
      this.setState({ preventionBoards: res.data.posts });
    });
    BoardService.getBoards('report').then((res) => {
      this.setState({ reportBoards: res.data.posts });
    });
  }

  renderBoardTable(boards) {
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>글 번호</th>
            <th>타이틀</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>댓글 수</th>
            <th>좋아요 수</th>
          </tr>
        </thead>
        <tbody>
            {boards?.map((board, index) => (
                <tr key={board.postId ?? index}>
                <td>{board.postId}</td>
                <td>{board.title}</td>
                <td>{board.creator}</td>
                <td>{new Date(board.createdDateTime).toLocaleString()}</td>
                <td>{board.commentCount}</td>
                <td>{board.heartCount}</td>
                </tr>
            ))}
        </tbody>

      </table>
    );
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Prevention Boards List</h2>
        <div className="row">
          {this.renderBoardTable(this.state.preventionBoards)}
        </div>

        <hr />
        <h2 className="text-center">Report Boards List</h2>
        <div className="row">
          {this.renderBoardTable(this.state.reportBoards)}
        </div>
      </div>
    );
  }
}

export default BoardList;
