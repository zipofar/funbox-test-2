import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default class ListPoints extends React.Component
{
    constructor(props) {
        super(props);

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const points = reorder(
            this.props.points,
            result.source.index,
            result.destination.index
        );

        this.props.reorderPointsInStore(points);
    }

    onClickButtonDelete = (id) => (e) => {
        e.preventDefault();
        this.props.removePointFromStore(id);
    };

    showListPoints = () => {
        const { points } = this.props;
        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => {
                        return(
                            <ul
                                className="list-group"
                                ref={provided.innerRef}
                            >
                                {points.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <li
                                                className='list-group-item'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <button
                                                    className='btn'
                                                    onClick={this.onClickButtonDelete(item.id)}
                                                >X</button>
                                                {item.namePoint}
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}}
                </Droppable>
            </DragDropContext>
        );
    };

    render() {

        if (this.props.points.length === 0) {
            return null;
        }

        return(
            <div id='selectedPoints'>
                {this.showListPoints()}
            </div>
        );
    }
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};