import React, {Component} from 'react'

class TableHeader extends Component {
    raiseSort  = sortedItem => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.sortedItem === sortedItem)
          sortColumn.order = (sortColumn.order === "asc") ? "desc" : "asc";
          else {
            sortColumn.sortedItem = sortedItem
            sortColumn.order = "asc"
          } 
          this.props.onSort(sortColumn)
    }


    render() { 
        return <thead>
            <tr>
                {this.props.columns.map(column =><th key={column.path || column.key}  onClick={() =>this.raiseSort(column.path)} >{column.label}</th>)}
            </tr>
        </thead>;
    }
}
 
export default TableHeader;