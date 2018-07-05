import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './job-my-suffix.reducer';
import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJobMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class JobMySuffixDetail extends React.Component<IJobMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { jobEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Job [<b>{jobEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="jobTitle">Job Title</span>
            </dt>
            <dd>{jobEntity.jobTitle}</dd>
            <dt>
              <span id="minSalary">Min Salary</span>
            </dt>
            <dd>{jobEntity.minSalary}</dd>
            <dt>
              <span id="maxSalary">Max Salary</span>
            </dt>
            <dd>{jobEntity.maxSalary}</dd>
            <dt>Employee</dt>
            <dd>{jobEntity.employeeId ? jobEntity.employeeId : ''}</dd>
            <dt>Task</dt>
            <dd>
              {jobEntity.tasks
                ? jobEntity.tasks.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === jobEntity.tasks.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/job-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/job-my-suffix/${jobEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ job }: IRootState) => ({
  jobEntity: job.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobMySuffixDetail);
