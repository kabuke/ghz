import React, { Component } from 'react'
import { Pane, Heading, Button, Paragraph, Badge } from 'evergreen-ui'
import { toUpper } from 'lodash'

import EditProjectDialog from './EditProjectDialog'

export default class ProjectDetailPane extends Component {
  constructor (props) {
    super(props)

    this.state = {
      projectId: props.projectId || -1,
      editProjectVisible: false
    }
  }

  componentDidMount () {
    this.props.projectStore.fetchProject(this.props.projectId)
  }

  componentDidUpdate (prevProps) {
    if (!this.props.projectStore.state.isFetching &&
      (this.props.projectId !== prevProps.projectId)) {
      this.props.projectStore.fetchProject(this.props.projectId)
    }
  }

  render () {
    const { state: { currentProject } } = this.props.projectStore

    if (!currentProject) {
      return (<Pane />)
    }
    return (
      <Pane>
        <Pane display='flex' alignItems='center' marginBottom={10}>
          {(currentProject.status && currentProject.status.toLowerCase() === 'ok')
            ? <Badge color='green' isSolid marginRight={8}>OK</Badge>
            : <Badge color='red' isSolid marginRight={8}>FAIL</Badge>}
          <Heading size={500}>{toUpper(currentProject.name)}</Heading>
          {this.state.editProjectVisible
            ? <EditProjectDialog
              projectStore={this.props.projectStore}
              project={currentProject}
              isShown={this.state.editProjectVisible}
              onDone={() => this.setState({ editProjectVisible: false })}
            /> : null
          }
          <Button onClick={() => this.setState({ editProjectVisible: !this.state.editProjectVisible })} marginLeft={14} iconBefore='edit' appearance='minimal' intent='none'>EDIT</Button>
        </Pane>
        <Paragraph>{currentProject.description}</Paragraph>
      </Pane>
    )
  }
}
