import React from 'react';
import { getToken, getUser } from '../utils/Common';
import Requests from '../utils/requests';
import { KINDOFTOURISM } from '../utils/Constants';
import review from '../fonts/review.png';
import rejected from '../fonts/rejected.png';
import accepted from '../fonts/accepted.png';
import DataTable from 'react-data-table-component';


export default class Dashboard extends React.Component {
	columns = [
		{
			name: 'Название спорт. организации',
			selector: row => row.group_name,
			sortable: false,
			right: false,
			wrap: true,
			width: "280px",
			center: true
		},
		{
			name: 'Общий регион',
			selector: row => row.global_region,
			sortable: false,
			wrap: true,
			center: true,
		},
		{
			name: 'Вид туризма',
			selector: row => row.kind,
			sortable: true,
			cell: row => KINDOFTOURISM[row.kind],
			center: true,
		},
		{
			name: 'Категория сложности',
			selector: row => row.difficulty_category,
			sortable: false,
			width: "230px",
			center: true,
		},
		{
			name: 'Статус',
			selector: row => row.status,
			sortable: false,
			cell: row => <img height="50px" src={row.status} alt="status" />,
			center: true,
		},
		{
			name: 'Дата начала',
			selector: row => row.start_date,
			sortable: true,
			center: true,
		},
		{
			name: 'Дата завершения',
			selector: row => row.end_date,
			sortable: false,
			center: true,
		},
	];

	constructor(props) {
		super(props);
		this.user = getUser();
		this.state = {
			error: null,
			isLoaded: false,
			trips: [],
		};
		this.isMyApps = this.props.isMyApps;
		this.onClickOnRow = this.onClickOnRow.bind(this);
	}

	async componentDidMount() {
		const config = getToken() ? {
			headers: {
				Authorization: 'Token ' + getToken()
			}
		} : {};
		const request = new Requests();
		await request.get(`${process.env.REACT_APP_URL}/api/trips`, config)
			.then(
				(result) => {
					if (this.isMyApps) {
						this.setState({
							trips: result.data.filter(trip => trip.leader.username == this.user).map(item => {
								item.status = this.renderImage(item.status);
								return item;
							})
						});
					} else {
						this.setState({
							trips: result.data.map(item => {
								item.status = this.renderImage(item.status);
								return item;
							})
						});
					}

				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				});
	}

	onClickOnRow(target) {
		this.props.history.push({
			pathname: '/application',
			state: target.id,
		});
	};

	renderImage(status) {
		if (status === "on_review") {
			return review;
		} else if (status === "rejected") {
			return rejected
		}
		return accepted;
	}

	render() {
		return (
			<DataTable
				columns={this.columns}
				data={this.state.trips}
				// subHeaderWrap={false}
				// fixedHeader={true}
				onRowClicked={row => { this.onClickOnRow(row); }}
				pagination
				paginationComponentOptions={{
					rowsPerPageText: 'Страница: ',
					rangeSeparatorText: 'из', noRowsPerPage: true,
					selectAllRowsItem: false
				}}
			/>
		);
	}
}