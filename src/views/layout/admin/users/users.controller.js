/**
 * Controller for the users state
 */
class UsersController {
  /**
   * @param $log
   * @param afUser
   * @param $filter
   * @param $mdToast
   * @ngInject
   */
  constructor($log, afUser, $filter, $mdToast) {
    this.$log = $log

    /**
     * object representing the column of ag-grid table
     * @type {*[]}
     */
    const columnDefs = [
      {
        headerName: 'id',
        field: 'id',
        width: 50,
      },
      {
        headerName: 'Avatar',
        field: 'avatar',
        cellRenderer: (params)=> {
          return `<img src="${params.data.avatar}" height="150px" class="md-avatar"/>`
        },
      },
      {
        headerName: 'name',
        field: 'name',
        editable: true,
      },
      {
        headerName: 'UserName',
        field: 'username',
        editable: true,
        newValueHandler: (params) => {
          params.data.username = params.newValue
          afUser
            .update(params.data.id, params.data)
            .then(() => {
              $mdToast.show(
                $mdToast.simple()
                  .content($filter('translate')('USERS.USERUPDATE'))
                  .position('bottom right')
                  .hideDelay(500)
              )
            })
            .catch(() => {
              $mdToast.show(
                $mdToast.simple()
                  .content($filter('translate')('USERS.USERERROR'))
                  .position('bottom right')
                  .hideDelay(500)
              )
            })
        },
      },
      {
        headerName: 'Date of birth',
        field: 'dob',
        cellRenderer: (params) => {
          return `<span>${$filter('date')(params.data.dob, 'dd/MM/yyyy')}</span>`
        },
      },
    ]
    /**
     * data source object for ag-grid
     * @type {{rowCount: null, pageSize: number, getRows: Function}}
     */
    const dataSource = {
      rowCount: null, // behave as infinite scroll
      pageSize: 10,
      getRows: function (params) {
        afUser.findAll({
          _start: params.startRow,
          _limit: 10,
        })
          .then(response => {
            params.successCallback(response, -1)
          })
      },
    }

    /**
     * configuration object for ag-grid
     * @type {{columnDefs: *[], dataSource: {rowCount: null, pageSize: number, getRows: Function}, rowHeight: number, enableColResize: boolean, rowSelection: string, rowDeselection: boolean, enableSorting: boolean, onGridReady: Function}}
     */
    this.usersGridOptions = {
      columnDefs,
      dataSource,
      rowHeight: 150,
      enableColResize: true,
      rowSelection: 'single',
      rowDeselection: true,
      enableSorting: true,
      onGridReady: () => {
        this.usersGridOptions.api.setDatasource(dataSource)
      },
    }
  }
}

export {
  UsersController,
}
