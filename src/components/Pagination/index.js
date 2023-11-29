import React from 'react';
import style from './Pagination.module.css';
import PropTypes from 'prop-types';

const Pagination =  React.memo(({ rowCount, dispatch, limit, skip })=>{
	
	const pages = Math.ceil(rowCount/limit)
	
	return (
		<ul className={style.container}>
			<li onClick={()=>dispatch({type: 'previous_page'})} ></li>
			{
				(function(){
					
					let elementArr = []
					
					for( let i = 1; i <= pages; i++){
						
						elementArr.push(<li className={skip === (i*limit-limit)? style.active: ""} onClick={()=>dispatch({type: 'change_page', page: i})} key={i}>{i}</li>)
					}
					
					return elementArr
				})()
			}
			
			<li onClick={()=>dispatch({type: 'next_page', rowCount})} ></li>
		</ul>
	)
})

Pagination.defaultProps = {
	rowCount: 0,
	limit: 0,
	skip: 0,
	hidden_total: 0
}
Pagination.propTypes = {
	rowCount: PropTypes.number,
	limit: PropTypes.number,
	skip: PropTypes.number,
	hidden_total: PropTypes.number
}

export default Pagination;