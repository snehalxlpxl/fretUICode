import { snippetCode } from '@core/components/card-snippet/card-snippet.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export const snippetCodeKitchenSink: snippetCode = {
  html: `
<div class="row">
  <div class="col-12 mb-50">
    <button class="btn btn-primary ml-1" rippleEffect>
      <i data-feather="plus" class="mr-0 mr-sm-1"></i
      ><span class="d-none d-sm-inline-block">Add New Record</span>
    </button>

    <a csvLink [data]="exportCSVData" class="btn btn-outline-secondary float-right mr-1" rippleEffect
      >Export CSV</a
    >
  </div>
  <div class="col-md-6 col-12">
    <div class="d-flex justify-content-between align-items-center m-1">
      <label class="d-flex align-items-center"
        >Show
        <select class="form-control mx-25" [(ngModel)]="basicSelectedOption">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        entries</label
      >
    </div>
  </div>
  <div class="col-md-6 col-12 d-flex justify-content-md-end">
    <div class="d-flex align-items-center justify-content-end pr-1 pb-1 pl-1 pl-md-0 pb-md-0">
      <label class="d-flex align-items-center"
        >Search<input
          type="search"
          placeholder="Search"
          class="form-control ml-25"
          (keyup)="filterUpdate($event)"
          (search)="filterUpdate($event)"
      /></label>
    </div>
  </div>
</div>
<ngx-datatable
  [rows]="kitchenSinkRows"
  [rowHeight]="58"
  class="bootstrap core-bootstrap"
  [limit]="10"
  [columnMode]="ColumnMode.force"
  [headerHeight]="40"
  [footerHeight]="50"
  [scrollbarH]="true"
  [selectionType]="SelectionType.checkbox"
  [limit]="basicSelectedOption"
  (activate)="onActivate($event)"
  (select)="onSelect($event)"
>
  <ngx-datatable-column
    [width]="50"
    [sortable]="false"
    [canAutoResize]="false"
    [draggable]="false"
    [resizeable]="false"
  >
    <ng-template
      ngx-datatable-header-template
      let-value="value"
      let-allRowsSelected="allRowsSelected"
      let-selectFn="selectFn"
    >
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          [checked]="allRowsSelected"
          (change)="selectFn(!allRowsSelected)"
          id="headerChkbxRef"
        />
        <label class="custom-control-label" for="headerChkbxRef"></label>
      </div>
    </ng-template>
    <ng-template
      ngx-datatable-cell-template
      let-rowIndex="rowIndex"
      let-value="value"
      let-isSelected="isSelected"
      let-onCheckboxChangeFn="onCheckboxChangeFn"
    >
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          [checked]="isSelected"
          (change)="onCheckboxChangeFn($event)"
          id="rowChkbxRef{{ rowIndex }}"
        />
        <label class="custom-control-label" for="rowChkbxRef{{ rowIndex }}"></label>
      </div>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column name="Name" prop="full_name" [width]="280">
    <ng-template let-row="row" let-name="value" ngx-datatable-cell-template>
      <div class="d-flex align-items-center">
        <div *ngIf="row.avatar.length > 0; else customAvatar">
          <img
            class="rounded-circle mr-1"
            src="assets/images/portrait/small/{{ row.avatar }}"
            height="32"
            width="32"
            alt="datatable-avatar"
          />
        </div>
        <ng-template #customAvatar>
          <div
            class="avatar mr-1 ml-0"
            [ngClass]="{
              'bg-light-primary': row.status == '1',
              'bg-light-success': row.status == '2',
              'bg-light-danger': row.status == '3',
              'bg-light-warning': row.status == '4',
              'bg-light-info': row.status == '5'
            }"
          >
            <div class="avatar-content">{{ name | initials }}</div>
          </div>
        </ng-template>
        <div class="cell-line-height">
          <p class="font-medium-1 font-weight-bold line-height-1 mb-25">
            {{ name }}
          </p>
          <span class="text-muted font-small-2"> {{ row.post }}</span>
        </div>
      </div>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column name="Email" prop="email" [width]="250"></ngx-datatable-column>
  <ngx-datatable-column name="Date" prop="start_date" [width]="120"></ngx-datatable-column>
  <ngx-datatable-column name="Salary" prop="salary" [width]="120"></ngx-datatable-column>
  <ngx-datatable-column name="Status" prop="status" [width]="120">
    <ng-template let-status="value" ngx-datatable-cell-template>
      <div
        class="badge badge-pill"
        [ngClass]="{
          'badge-light-primary': status == '1',
          'badge-light-success': status == '2',
          'badge-light-danger': status == '3',
          'badge-light-warning': status == '4',
          'badge-light-info': status == '5'
        }"
      >
        {{
          status == 1
            ? 'Current'
            : status == 2
            ? 'Professional'
            : status == 3
            ? 'Rejected'
            : status == 4
            ? 'Resigned'
            : status == 5
            ? 'Applied'
            : 'Applied'
        }}
      </div>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column name="Actions" [width]="120" [sortable]="false">
    <ng-template ngx-datatable-cell-template>
      <div class="d-flex align-items-center">
        <div ngbDropdown container="body">
          <a
            ngbDropdownToggle
            href="javascript:void(0);"
            class="hide-arrow"
            id="dropdownBrowserState"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
          </a>
          <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="file-text" class="mr-50"></i> Details</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="archive" class="mr-50"></i> Archive</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="trash-2" class="mr-50"></i> Delete</a
            >
          </div>
        </div>

        <i data-feather="edit" class="text-primary cursor-pointer"></i>
      </div>
    </ng-template>
  </ngx-datatable-column>
</ngx-datatable>
  `,
  ts: `
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;

  /**
   * Method Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.kitchenSinkRows = this.rows;
      this.exportCSVData = this.rows;
    });
  }
  `
};

export const snippetCodeInlineEditing: snippetCode = {
  html: `
<ngx-datatable
  class="bootstrap core-bootstrap"
  [headerHeight]="40"
  [rowHeight]="58"
  [limit]="10"
  [columnMode]="ColumnMode.force"
  [footerHeight]="50"
  [rows]="rows"
  [scrollbarH]="true"
>
  <ngx-datatable-column [width]="280" name="Name" prop="full_name">
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
      <div
        title="Double click to edit"
        (dblclick)="editingName[rowIndex + '-full_name'] = true"
        *ngIf="!editingName[rowIndex + '-full_name']"
      >
        <div class="d-flex align-items-center">
          <div *ngIf="row.avatar.length > 0; else customAvatar">
            <img
              class="rounded-circle mr-1"
              src="assets/images/portrait/small/{{ row.avatar }}"
              height="32"
              width="32"
              alt="datatable-avatar"
            />
          </div>
          <ng-template #customAvatar>
            <div
              class="avatar mr-1 ml-0"
              [ngClass]="{
                'bg-light-primary': row.status == '1',
                'bg-light-success': row.status == '2',
                'bg-light-danger': row.status == '3',
                'bg-light-warning': row.status == '4',
                'bg-light-info': row.status == '5'
              }"
            >
              <div class="avatar-content">{{ value | initials }}</div>
            </div>
          </ng-template>
          <div class="cell-line-height">
            <p class="font-medium-1 line-height-1 mb-0">{{ value }}</p>
            <span class="text-muted font-small-2"> {{ row.post }}</span>
          </div>
        </div>
      </div>
      <input
        autofocus
        class="form-control form-control-sm"
        (blur)="inlineEditingUpdateName($event, 'full_name', rowIndex)"
        *ngIf="editingName[rowIndex + '-full_name']"
        type="text"
        [value]="value"
      />
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column [width]="120" name="Status" prop="status">
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-row="row" let-value="value">
      <div
        title="Double click to edit"
        (dblclick)="editingStatus[rowIndex + '-status'] = true"
        *ngIf="!editingStatus[rowIndex + '-status']"
      >
        <div
          class="badge badge-pill"
          [ngClass]="{
            'badge-light-primary': value == '1',
            'badge-light-success': value == '2',
            'badge-light-danger': value == '3',
            'badge-light-warning': value == '4',
            'badge-light-info': value == '5'
          }"
        >
          {{
            value == 1
              ? 'Current'
              : value == 2
              ? 'Professional'
              : value == 3
              ? 'Rejected'
              : value == 4
              ? 'Resigned'
              : value == 5
              ? 'Applied'
              : 'Applied'
          }}
        </div>
      </div>
      <select
        *ngIf="editingStatus[rowIndex + '-status']"
        (blur)="editingStatus[rowIndex + '-status'] = false"
        (change)="inlineEditingUpdateStatus($event, 'status', rowIndex)"
        [value]="value"
        class="form-control form-control-sm"
      >
        <option value="1">Current</option>
        <option value="2">Professional</option>
        <option value="3">Rejected</option>
        <option value="4">Resigned</option>
        <option value="5">Applied</option>
      </select>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column [width]="50" name="Age" prop="age">
    <ng-template ngx-datatable-cell-template let-value="value" let-rowIndex="rowIndex" let-row="row">
      <div
        title="Double click to edit"
        (dblclick)="editingAge[rowIndex + '-age'] = true"
        *ngIf="!editingAge[rowIndex + '-age']"
      >
        {{ value }}
      </div>
      <input
        autofocus
        class="form-control form-control-sm"
        (blur)="inlineEditingUpdateAge($event, 'age', rowIndex)"
        *ngIf="editingAge[rowIndex + '-age']"
        type="text"
        [value]="value"
      />
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column [width]="100" name="Salary" prop="salary" [width]="120">
    <ng-template ngx-datatable-cell-template let-value="value" let-rowIndex="rowIndex" let-row="row">
      <div
        title="Double click to edit"
        (dblclick)="editingSalary[rowIndex + '-salary'] = true"
        *ngIf="!editingSalary[rowIndex + '-salary']"
      >
        {{ value }}
      </div>
      <input
        autofocus
        class="form-control form-control-sm"
        (blur)="inlineEditingUpdateSalary($event, 'salary', rowIndex)"
        *ngIf="editingSalary[rowIndex + '-salary']"
        type="text"
        [value]="value"
      />
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column name="Actions" [width]="120" [sortable]="false">
    <ng-template ngx-datatable-cell-template>
      <div class="d-flex align-items-center">
        <div ngbDropdown container="body">
          <a
            ngbDropdownToggle
            href="javascript:void(0);"
            class="hide-arrow"
            id="dropdownBrowserState"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
          </a>
          <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="file-text" class="mr-50"></i> Details</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="archive" class="mr-50"></i> Archive</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="trash-2" class="mr-50"></i> Delete</a
            >
          </div>
        </div>

        <i data-feather="edit" class="text-primary cursor-pointer"></i>
      </div>
    </ng-template>
  </ngx-datatable-column>
</ngx-datatable>
  `,
  ts: `

  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};

  /**
   * Inline editing Name
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateName(event, cell, rowIndex) {
    this.editingName[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Age
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateAge(event, cell, rowIndex) {
    this.editingAge[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Salary
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateSalary(event, cell, rowIndex) {
    this.editingSalary[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Status
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateStatus(event, cell, rowIndex) {
    this.editingStatus[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
    });
  }
  `
};

export const snippetCodeRowDetails: snippetCode = {
  html: `
  <!-- ngx-datatable-row-details -->
  <ngx-datatable
    #tableRowDetails
    class="bootstrap core-bootstrap"
    [columnMode]="ColumnMode.force"
    [headerHeight]="40"
    [footerHeight]="50"
    [rowHeight]="58"
    [limit]="10"
    [rows]="rows"
    [scrollbarH]="true"
  >
    <!-- Row Detail Template -->
    <ngx-datatable-row-detail [rowHeight]="50">
      <ng-template let-row="row" let-expanded="expanded" ngx-datatable-row-detail-template>
        <div class="ml-75 pl-5 pt-75">
          <div>
            <span><strong>City : </strong> {{ row.city }}</span
            ><span class="ml-1"><strong>Experience : </strong> {{ row.experience }}</span
            ><span class="ml-1"><strong>Start Date : </strong> {{ row.start_date }}</span>
          </div>
        </div>
      </ng-template>
    </ngx-datatable-row-detail>
    <ngx-datatable-column
      [width]="50"
      [resizeable]="false"
      [sortable]="false"
      [draggable]="false"
      [canAutoResize]="false"
    >
      <ng-template let-row="row" let-expanded="expanded" ngx-datatable-cell-template>
        <a
          href="javascript:void(0)"
          [class.datatable-icon-right]="!expanded"
          [class.datatable-icon-down]="expanded"
          title="Expand/Collapse Row"
          (click)="rowDetailsToggleExpand(row)"
        >
        </a>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Name" prop="full_name" [width]="280">
      <ng-template let-row="row" let-name="value" ngx-datatable-cell-template>
        <div class="d-flex align-items-center">
          <div *ngIf="row.avatar.length > 0; else customAvatar">
            <img
              class="rounded-circle mr-1"
              src="assets/images/portrait/small/{{ row.avatar }}"
              height="32"
              width="32"
              alt="datatable-avatar"
            />
          </div>
          <ng-template #customAvatar>
            <div
              class="avatar mr-1 ml-0"
              [ngClass]="{
                'bg-light-primary': row.status == '1',
                'bg-light-success': row.status == '2',
                'bg-light-danger': row.status == '3',
                'bg-light-warning': row.status == '4',
                'bg-light-info': row.status == '5'
              }"
            >
              <div class="avatar-content">{{ name | initials }}</div>
            </div>
          </ng-template>
          <div class="cell-line-height">
            <p class="font-medium-1 line-height-1 mb-0">{{ name }}</p>
            <span class="text-muted font-small-2"> {{ row.post }}</span>
          </div>
        </div>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Email" prop="email" [width]="250"></ngx-datatable-column>
    <ngx-datatable-column name="Age" prop="age" [width]="50"></ngx-datatable-column>
    <ngx-datatable-column name="Salary" prop="salary" [width]="120"></ngx-datatable-column>
    <ngx-datatable-column name="Status" prop="status" [width]="120">
      <ng-template let-status="value" ngx-datatable-cell-template>
        <div
          class="badge badge-pill"
          [ngClass]="{
            'badge-light-primary': status == '1',
            'badge-light-success': status == '2',
            'badge-light-danger': status == '3',
            'badge-light-warning': status == '4',
            'badge-light-info': status == '5'
          }"
        >
          {{
            status == 1
              ? 'Current'
              : status == 2
              ? 'Professional'
              : status == 3
              ? 'Rejected'
              : status == 4
              ? 'Resigned'
              : status == 5
              ? 'Applied'
              : 'Applied'
          }}
        </div>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Actions" [width]="120" [sortable]="false">
      <ng-template ngx-datatable-cell-template>
        <div class="d-flex align-items-center">
          <div ngbDropdown container="body">
            <a
              ngbDropdownToggle
              href="javascript:void(0);"
              class="hide-arrow"
              id="dropdownBrowserState"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
            </a>
            <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="file-text" class="mr-50"></i> Details</a
              >
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="archive" class="mr-50"></i> Archive</a
              >
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="trash-2" class="mr-50"></i> Delete</a
              >
            </div>
          </div>

          <i data-feather="edit" class="text-primary cursor-pointer"></i>
        </div>
      </ng-template>
    </ngx-datatable-column>
  </ngx-datatable>
  <!-- ngx-datatable-row-details -->
  `,
  ts: `

  @ViewChild('tableRowDetails') tableRowDetails: any;

  public ColumnMode = ColumnMode;

  /**
   * rowDetailsToggleExpand
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
    });
  }
  `
};

export const snippetCodeCustomCheckbox: snippetCode = {
  html: `
<!-- ngx-datatable-custom-checkbox -->
  <div class="row">
    <div class="col-12">
      <ngx-datatable
        class="bootstrap core-bootstrap"
        [rows]="rows"
        [columnMode]="ColumnMode.force"
        [headerHeight]="40"
        [footerHeight]="50"
        [rowHeight]="58"
        [limit]="10"
        [selected]="chkBoxSelected"
        [selectionType]="SelectionType.checkbox"
        (select)="customChkboxOnSelect($event)"
        [scrollbarH]="true"
        (activate)="onActivate($event)"
        (select)="onSelect($event)"
      >
        <ngx-datatable-column
          [width]="50"
          [sortable]="false"
          [canAutoResize]="false"
          [draggable]="false"
          [resizeable]="false"
        >
          <ng-template
            ngx-datatable-header-template
            let-value="value"
            let-allRowsSelected="allRowsSelected"
            let-selectFn="selectFn"
          >
            <div class="custom-control custom-control-primary custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                [checked]="allRowsSelected"
                (change)="selectFn(!allRowsSelected)"
                id="headerCustomChkbxRef"
              />
              <label class="custom-control-label" for="headerCustomChkbxRef"></label>
            </div>
          </ng-template>
          <ng-template
            ngx-datatable-cell-template
            let-rowIndex="rowIndex"
            let-value="value"
            let-isSelected="isSelected"
            let-onCheckboxChangeFn="onCheckboxChangeFn"
          >
            <div class="custom-control custom-control-primary custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                [checked]="isSelected"
                (change)="onCheckboxChangeFn($event)"
                id="rowCustomChkbxRef{{ rowIndex }}"
              />
              <label class="custom-control-label" for="rowCustomChkbxRef{{ rowIndex }}"></label>
            </div>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Name" prop="full_name" [width]="280">
          <ng-template let-row="row" let-name="value" ngx-datatable-cell-template>
            <div class="d-flex align-items-center">
              <div *ngIf="row.avatar.length > 0; else customAvatar">
                <img
                  class="rounded-circle mr-1"
                  src="assets/images/portrait/small/{{ row.avatar }}"
                  height="32"
                  width="32"
                  alt="datatable-avatar"
                />
              </div>
              <ng-template #customAvatar>
                <div
                  class="avatar mr-1 ml-0"
                  [ngClass]="{
                    'bg-light-primary': row.status == '1',
                    'bg-light-success': row.status == '2',
                    'bg-light-danger': row.status == '3',
                    'bg-light-warning': row.status == '4',
                    'bg-light-info': row.status == '5'
                  }"
                >
                  <div class="avatar-content">{{ name | initials }}</div>
                </div>
              </ng-template>
              <div class="cell-line-height">
                <p class="font-medium-1 line-height-1 mb-0">{{ name }}</p>
                <span class="text-muted font-small-2"> {{ row.post }}</span>
              </div>
            </div>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Email" prop="email" [width]="250"></ngx-datatable-column>
        <ngx-datatable-column name="Age" prop="age" [width]="50"></ngx-datatable-column>
        <ngx-datatable-column name="Salary" prop="salary" [width]="120"></ngx-datatable-column>
        <ngx-datatable-column name="Status" prop="status" [width]="120">
          <ng-template let-status="value" ngx-datatable-cell-template>
            <div
              class="badge badge-pill"
              [ngClass]="{
                'badge-light-primary': status == '1',
                'badge-light-success': status == '2',
                'badge-light-danger': status == '3',
                'badge-light-warning': status == '4',
                'badge-light-info': status == '5'
              }"
            >
              {{
                status == 1
                  ? 'Current'
                  : status == 2
                  ? 'Professional'
                  : status == 3
                  ? 'Rejected'
                  : status == 4
                  ? 'Resigned'
                  : status == 5
                  ? 'Applied'
                  : 'Applied'
              }}
            </div>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Actions" [width]="120" [sortable]="false">
          <ng-template ngx-datatable-cell-template>
            <div class="d-flex align-items-center">
              <div ngbDropdown container="body">
                <a
                  ngbDropdownToggle
                  href="javascript:void(0);"
                  class="hide-arrow"
                  id="dropdownBrowserState"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
                </a>
                <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
                  <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                    ><i data-feather="file-text" class="mr-50"></i> Details</a
                  >
                  <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                    ><i data-feather="archive" class="mr-50"></i> Archive</a
                  >
                  <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                    ><i data-feather="trash-2" class="mr-50"></i> Delete</a
                  >
                </div>
              </div>

              <i data-feather="edit" class="text-primary cursor-pointer"></i>
            </div>
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
    <div class="selected-column col-12 mt-1">
      <hr class="w-100" />
      <h5 class="mx-1">
        Selections <small>({{ chkBoxSelected?.length }})</small>
      </h5>
      <ul>
        <li *ngFor="let sel of chkBoxSelected">
          {{ sel.full_name }}
        </li>
        <li *ngIf="!chkBoxSelected?.length">No Selections</li>
      </ul>
    </div>
  </div>
  <!--/ ngx-datatable-custom-checkbox -->
  `,
  ts: `

  @ViewChild('tableRowDetails') tableRowDetails: any;

  public ColumnMode = ColumnMode;

  public chkBoxSelected = [];

  /**
   * customChkboxOnSelect
   *
   * @param { selected }
   */
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
    });
  }

  `
};

export const snippetCodeResponsive: snippetCode = {
  html: `
  <!-- ngx-datatables responsive -->
  <ngx-datatable
    #table
    class="bootstrap core-bootstrap"
    [columnMode]="ColumnMode.force"
    [headerHeight]="40"
    [rowHeight]="58"
    [footerHeight]="50"
    rowHeight="auto"
    [limit]="10"
    [rows]="rows"
    [scrollbarH]="true"
  >
    <ngx-datatable-column name="Name" prop="full_name" [width]="280">
      <ng-template let-row="row" let-name="value" ngx-datatable-cell-template>
        <div class="d-flex align-items-center">
          <div *ngIf="row.avatar.length > 0; else customAvatar">
            <img
              class="rounded-circle mr-1"
              src="assets/images/portrait/small/{{ row.avatar }}"
              height="32"
              width="32"
              alt="datatable-avatar"
            />
          </div>
          <ng-template #customAvatar>
            <div
              class="avatar mr-1 ml-0"
              [ngClass]="{
                'bg-light-primary': row.status == '1',
                'bg-light-success': row.status == '2',
                'bg-light-danger': row.status == '3',
                'bg-light-warning': row.status == '4',
                'bg-light-info': row.status == '5'
              }"
            >
              <div class="avatar-content">{{ name | initials }}</div>
            </div>
          </ng-template>
          <div class="cell-line-height">
            <p class="font-medium-1 line-height-1 mb-0">{{ name }}</p>
            <span class="text-muted font-small-2"> {{ row.post }}</span>
          </div>
        </div>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Email" prop="email" [width]="250"></ngx-datatable-column>
    <ngx-datatable-column name="Age" prop="age" [width]="50"></ngx-datatable-column>
    <ngx-datatable-column name="Status" prop="status" [width]="120">
      <ng-template let-status="value" ngx-datatable-cell-template>
        <div
          class="badge badge-pill"
          [ngClass]="{
            'badge-light-primary': status == '1',
            'badge-light-success': status == '2',
            'badge-light-danger': status == '3',
            'badge-light-warning': status == '4',
            'badge-light-info': status == '5'
          }"
        >
          {{
            status == 1
              ? 'Current'
              : status == 2
              ? 'Professional'
              : status == 3
              ? 'Rejected'
              : status == 4
              ? 'Resigned'
              : status == 5
              ? 'Applied'
              : 'Applied'
          }}
        </div>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Action" [width]="120" [sortable]="false">
      <ng-template ngx-datatable-cell-template>
        <div class="d-flex align-items-center">
          <div ngbDropdown container="body">
            <a
              ngbDropdownToggle
              href="javascript:void(0);"
              class="hide-arrow"
              id="dropdownBrowserState"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
            </a>
            <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="file-text" class="mr-50"></i> Details</a
              >
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="archive" class="mr-50"></i> Archive</a
              >
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="trash-2" class="mr-50"></i> Delete</a
              >
            </div>
          </div>

          <i data-feather="edit" class="text-primary cursor-pointer"></i>
        </div>
      </ng-template>
    </ngx-datatable-column>
  </ngx-datatable>
  <!--/ ngx-datatables responsive -->
  `,
  ts: `
  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
    });
  }
  `
};

export const snippetCodeMultilangual: snippetCode = {
  html: `
  <ngx-datatable
  #table
  class="bootstrap core-bootstrap"
  [columnMode]="ColumnMode.force"
  [headerHeight]="40"
  [rowHeight]="58"
  [footerHeight]="50"
  rowHeight="auto"
  [limit]="10"
  [rows]="rows"
  [scrollbarH]="true"
>
  <ngx-datatable-column name="{{ 'HEADER.NAME' | translate }}" prop="full_name" [width]="280">
    <ng-template let-row="row" let-name="value" ngx-datatable-cell-template>
      <div class="d-flex align-items-center">
        <div *ngIf="row.avatar.length > 0; else customAvatar">
          <img
            class="rounded-circle mr-1"
            src="assets/images/portrait/small/{{ row.avatar }}"
            height="32"
            width="32"
            alt="datatable-avatar"
          />
        </div>
        <ng-template #customAvatar>
          <div
            class="avatar mr-1 ml-0"
            [ngClass]="{
              'bg-light-primary': row.status == '1',
              'bg-light-success': row.status == '2',
              'bg-light-danger': row.status == '3',
              'bg-light-warning': row.status == '4',
              'bg-light-info': row.status == '5'
            }"
          >
            <div class="avatar-content">{{ name | initials }}</div>
          </div>
        </ng-template>
        <div class="cell-line-height">
          <p class="font-medium-1 line-height-1 mb-0">{{ name }}</p>
          <span class="text-muted font-small-2"> {{ row.post }}</span>
        </div>
      </div>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column
    name="{{ 'HEADER.EMAIL' | translate }}"
    prop="email"
    [width]="250"
  ></ngx-datatable-column>
  <ngx-datatable-column name="{{ 'HEADER.AGE' | translate }}" prop="age" [width]="50"></ngx-datatable-column>
  <ngx-datatable-column name="{{ 'HEADER.STATUS' | translate }}" prop="status" [width]="120">
    <ng-template let-status="value" ngx-datatable-cell-template>
      <div
        class="badge badge-pill"
        [ngClass]="{
          'badge-light-primary': status == '1',
          'badge-light-success': status == '2',
          'badge-light-danger': status == '3',
          'badge-light-warning': status == '4',
          'badge-light-info': status == '5'
        }"
      >
        {{
          status == 1
            ? 'Current'
            : status == 2
            ? 'Professional'
            : status == 3
            ? 'Rejected'
            : status == 4
            ? 'Resigned'
            : status == 5
            ? 'Applied'
            : 'Applied'
        }}
      </div>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column name="{{ 'HEADER.ACTIONS' | translate }}" [width]="120" [sortable]="false">
    <ng-template ngx-datatable-cell-template>
      <div class="d-flex align-items-center">
        <div ngbDropdown container="body">
          <a
            ngbDropdownToggle
            href="javascript:void(0);"
            class="hide-arrow"
            id="dropdownBrowserState"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
          </a>
          <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="file-text" class="mr-50"></i> Details</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="archive" class="mr-50"></i> Archive</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="trash-2" class="mr-50"></i> Delete</a
            >
          </div>
        </div>

        <i data-feather="edit" class="text-primary cursor-pointer"></i>
      </div>
    </ng-template>
  </ngx-datatable-column>
</ngx-datatable>
  `,
  ts: `
  constructor( private _coreTranslationService: CoreTranslationService) {
    this._coreTranslationService.translate(english, french, german, portuguese);
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
    });
  }
  `
};

export const snippetCodeVertical: snippetCode = {
  html: `
<form class="form form-vertical">
  <div class="row">
    <div class="col-12">
      <div class="form-group">
        <label for="first-name-vertical">First Name</label>
        <input
          type="text"
          id="first-name-vertical"
          class="form-control"
          name="fname"
          placeholder="First Name"
        />
      </div>
    </div>
    <div class="col-12">
      <div class="form-group">
        <label for="email-id-vertical">Email</label>
        <input
          type="email"
          id="email-id-vertical"
          class="form-control"
          name="email-id"
          placeholder="Email"
        />
      </div>
    </div>
    <div class="col-12">
      <div class="form-group">
        <label for="contact-info-vertical">Mobile</label>
        <input
          type="number"
          id="contact-info-vertical"
          class="form-control"
          name="contact"
          placeholder="Mobile"
        />
      </div>
    </div>
    <div class="col-12">
      <div class="form-group">
        <label for="password-vertical">Password</label>
        <input
          type="password"
          id="password-vertical"
          class="form-control"
          name="contact"
          placeholder="Password"
        />
      </div>
    </div>
    <div class="col-12">
      <div class="form-group">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="customCheck3" />
          <label class="custom-control-label" for="customCheck3">Remember me</label>
        </div>
      </div>
    </div>
    <div class="col-12">
      <button type="submit" rippleEffect class="btn btn-primary mr-1">Submit</button>
      <button type="reset" rippleEffect class="btn btn-outline-secondary">Reset</button>
    </div>
  </div>
</form>
  `
};
export const snippetCodeTDsimpleValidation: snippetCode = {
  html: `
  <form class="form-horizontal" (ngSubmit)="TDSimpleForm.form.valid" #TDSimpleForm="ngForm">
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label class="form-control-label" for="TDName">Name</label>
          <input class="form-control input-md" ngModel #TDNameRef="ngModel" required id="TDName" name="TDName"
            type="text" placeholder="Name">
          <span *ngIf="TDSimpleForm.submitted && TDNameRef.invalid" class="invalid-form">
            <small class="form-text text-muted danger" *ngIf="TDNameRef.errors.required">This
              field is
              required!</small>
          </span>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label class="form-control-label" for="TDEmail">Email</label>
          <input class="form-control input-md" ngModel #TDEmailRef="ngModel" required email id="TDEmail"
            name="TDEmail" type="text" placeholder="Email">
          <span *ngIf="TDSimpleForm.submitted" class="invalid-form">
            <small class="form-text text-muted danger" *ngIf="!TDEmailRef.valid">email must be valid!</small>
          </span>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" rippleEffect>Submit</button>
  </form>
  `
};
export const snippetCodeTDMultiRuleValidation: snippetCode = {
  html: `
  <form class="form-horizontal" (ngSubmit)="TDMultiRuleForm.form.valid" #TDMultiRuleForm="ngForm">
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label class="form-control-label" for="TDMultiRuleName">Name</label>
          <input class="form-control input-md" ngModel #TDMultiRuleNameRef="ngModel" required
            id="TDMultiRuleName" name="TDMultiRuleName" type="text" placeholder="Your Name">
          <span *ngIf="!TDMultiRuleNameRef.valid && TDMultiRuleNameRef.touched" class="invalid-form">
            <small class="form-text text-muted danger" *ngIf="TDMultiRuleNameRef.errors.required">This
              field is
              required!</small>
          </span>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label class="form-control-label" for="TDMultiRuleEmail">Email</label>
          <input class="form-control input-md" ngModel #TDMultiRuleEmailRef="ngModel" required email
            id="TDMultiRuleEmail" name="TDMultiRuleEmail" type="text" placeholder="Your Email">
          <span *ngIf="!TDMultiRuleEmailRef.valid && TDMultiRuleEmailRef.touched" class="invalid-form">
            <small class="form-text text-muted danger">email must be valid!</small>
          </span>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label class="form-control-label" for="TDMultiRulePassword">Password</label>
          <input type="password" name="TDMultiRulePassword" class="form-control" placeholder="Your Password"
            ngModel #TDMultiRulePasswordRef="ngModel" required minlength="6"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" id="TDMultiRulePassword">
          <div *ngIf="TDMultiRulePasswordRef.invalid && TDMultiRulePasswordRef.touched"
            class="form-text text-muted danger">
            <small *ngIf="TDMultiRulePasswordRef.errors.required"> Password is required. </small>
            <small *ngIf="TDMultiRulePasswordRef.errors.pattern"> Must contain at least one number and one
              uppercase and
              lowercase letter, and at least 8 or more characters.</small>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label class="form-control-label" for="TDMultiRuleConfPassword">Confirm Password</label>
          <input type="password" class="form-control" placeholder="Confirm Password" minlength="6"
            name="TDMultiRuleConfPassword" placeholder="Confirm Password" class="form-control" required ngModel
            #TDMultiRuleConfPasswordRef="ngModel" pattern="{{ TDMultiRulePasswordRef.value }}"
            id="TDMultiRuleConfPassword">
          <div *ngIf=" TDMultiRuleConfPasswordRef.invalid && TDMultiRuleConfPasswordRef.touched"
            class="form-text text-muted danger">
            <small *ngIf="TDMultiRuleConfPasswordRef.errors.required"> Confirm password is required. </small>
            <small *ngIf="TDMultiRuleConfPasswordRef.errors.pattern"> Password & Confirm Password does not
              match.</small>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" [disabled]="!TDMultiRuleForm.form.valid" class="btn btn-primary" rippleEffect>Submit</button>
  </form>
  `
};
export const snippetCodeInputValidation: snippetCode = {
  html: `
<form class="form-horizontal" (ngSubmit)="(TDValidationForm.form.valid)" #TDValidationForm="ngForm">
  <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label class="form-control-label" for="TDRequiredField">This field is required</label>
        <input
          class="form-control input-md"
          [class.error]="TDRequiredFieldRef.invalid && TDValidationForm.submitted"
          ngModel
          #TDRequiredFieldRef="ngModel"
          required
          id="TDRequiredField"
          name="TDRequiredField"
          type="text"
        />
        <small
          class="form-text text-danger"
          *ngIf="TDRequiredFieldRef.invalid && TDValidationForm.submitted"
          >This field is required!</small
        >
      </div>
      <div class="form-group">
        <label class="form-control-label" for="TDNumberOnly">Must only consist of numbers</label>
        <input
          class="form-control input-md"
          [class.error]="TDNumberOnlyRef.invalid && TDValidationForm.submitted"
          ngModel
          #TDNumberOnlyRef="ngModel"
          required
          pattern="[0-9]+"
          id="TDNumberOnly"
          name="TDNumberOnly"
          type="text"
        />
        <small class="form-text text-danger" *ngIf="TDNumberOnlyRef.invalid && TDValidationForm.submitted"
          >The numeric field may only contain numeric characters.</small
        >
      </div>
      <div class="form-group">
        <label class="form-control-label" for="TDAlphabetOnly">Only alphabetic characters</label>
        <input
          class="form-control input-md"
          [class.error]="TDAlphabetOnlyRef.invalid && TDValidationForm.submitted"
          ngModel
          #TDAlphabetOnlyRef="ngModel"
          required
          pattern="[a-zA-Z]+$"
          id="TDAlphabetOnly"
          name="TDAlphabetOnly"
          type="text"
        />
        <small
          class="form-text text-danger"
          *ngIf="TDAlphabetOnlyRef.invalid && TDValidationForm.submitted"
          >The alphabetic field may only contain alphabet characters.</small
        >
      </div>
      <div class="form-group">
        <label class="form-control-label" for="TDPasswordOnly">Password Input Field</label>
        <input
          type="password"
          name="TDPasswordOnly"
          class="form-control"
          [class.error]="TDPasswordOnlyRef.invalid && TDValidationForm.submitted"
          id="TDPasswordOnly"
          placeholder="Your Password"
          ngModel
          #TDPasswordOnlyRef="ngModel"
          required
          minlength="6"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        />
        <div
          *ngIf="TDPasswordOnlyRef.invalid && TDValidationForm.submitted"
          class="form-text text-danger"
        >
          <small *ngIf="TDPasswordOnlyRef.errors.required"> password is required. </small>
          <small *ngIf="TDPasswordOnlyRef.errors.pattern">
            Must contain at least one number and one uppercase and lowercase letter, and at least 8 or
            more characters.</small
          >
        </div>
      </div>
      <div class="form-group">
        <label class="form-control-label" for="TDRepeatPassword">Repeat password must match</label>
        <input
          type="password"
          id="TDRepeatPassword"
          class="form-control"
          [class.error]="TDRepeatPasswordRef.invalid && TDValidationForm.submitted"
          placeholder="Confirm Password"
          minlength="6"
          name="TDRepeatPassword"
          placeholder="Confirm Password"
          required
          ngModel
          #TDRepeatPasswordRef="ngModel"
          pattern="{{ TDPasswordOnlyRef.value }}"
        />
        <div
          *ngIf="TDRepeatPasswordRef.invalid && TDValidationForm.submitted"
          class="form-text text-danger"
        >
          <small *ngIf="TDRepeatPasswordRef.errors.required"> Confirm password is required. </small>
          <small *ngIf="TDRepeatPasswordRef.errors.pattern">
            Password & Confirm Password does not match.</small
          >
        </div>
      </div>
      <div class="form-group">
        <label class="form-control-label" for="TDValidEmail">Must be a valid email</label>
        <input
          type="email"
          id="TDValidEmail"
          name="TDValidEmail"
          class="form-control"
          [class.error]="TDValidEmailRef.invalid && TDValidationForm.submitted"
          ngModel
          required
          #TDValidEmailRef="ngModel"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          placeholder="Email"
        />
        <small class="form-text text-danger" *ngIf="TDValidEmailRef.invalid && TDValidationForm.submitted"
          >Must be a valid email!</small
        >
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label class="form-control-label" for="TDNumBtwTenTwenty">Enter Number between 10 & 20</label>
        <input
          type="text"
          name="TDNumBtwTenTwenty"
          id="TDNumBtwTenTwenty"
          class="form-control"
          [class.error]="TDNumBtwTenTwentyRef.invalid && TDValidationForm.submitted"
          pattern="([^0-9]*[0-9]+)+"
          min="10"
          max="20"
          required
          placeholder="Enter Number between 10 & 20"
          ngModel
          #TDNumBtwTenTwentyRef="ngModel"
        />
        <small
          class="form-text text-danger"
          *ngIf="TDNumBtwTenTwentyRef.invalid && TDValidationForm.submitted"
          >Enter Number between 10 & 20!</small
        >
      </div>
      <div class="form-group">
        <label class="form-control-label" for="TDRegex"
          >Must match the specified regular expression : ^([0-9]+)$ - numbers only</label
        >
        <input
          type="text"
          name="TDRegex"
          class="form-control"
          [class.error]="TDRegexRef.invalid && TDValidationForm.submitted"
          pattern="^([0-9]+)$"
          id="TDRegex"
          placeholder="Enter specified regular expression"
          required
          ngModel
          #TDRegexRef="ngModel"
        />
        <small class="form-text text-danger" *ngIf="TDRegexRef.invalid && TDValidationForm.submitted"
          >The regex field format is invalid!</small
        >
      </div>
      <div class="form-group">
        <label class="form-control-label" for="TDLengthLessThree"
          >Length should not be less than the specified length : 3</label
        >
        <input
          type="text"
          name="TDLengthLessThree"
          id="TDLengthLessThree"
          class="form-control"
          [class.error]="TDLengthLessThreeRef.invalid && TDValidationForm.submitted"
          minlength="3"
          placeholder="Enter minimum 3 characters"
          ngModel
          required
          #TDLengthLessThreeRef="ngModel"
        />
        <small
          class="form-text text-danger"
          *ngIf="TDLengthLessThreeRef.invalid && TDValidationForm.submitted"
          >The min field must be at least 3 characters!</small
        >
      </div>
      <div class="form-group">
        <label class="form-control-label" for="TDNumThreeDigit"
          >The digits field must be numeric and exactly contain 3 digits</label
        >
        <input
          type="text"
          name="TDNumThreeDigit"
          id="TDNumThreeDigit"
          class="form-control"
          [class.error]="TDNumThreeDigitRef.invalid && TDValidationForm.submitted"
          pattern="([^0-9]*[0-9]+)+"
          maxlength="3"
          minlength="3"
          placeholder="Enter Exactly 3 digits"
          ngModel
          required
          #TDNumThreeDigitRef="ngModel"
        />
        <small
          class="form-text text-danger"
          *ngIf="TDNumThreeDigitRef.invalid && TDValidationForm.submitted"
          >The digits field must be numeric and exactly contain 3 digits!</small
        >
      </div>
      <div class="form-group">
        <label class="form-control-label" for="TDCharNumDU"
          >Only alphabetic characters, numbers, dashes or underscores</label
        >
        <input
          type="text"
          name="TDCharNumDU"
          id="TDCharNumDU"
          class="form-control"
          [class.error]="TDCharNumDURef.invalid && TDValidationForm.submitted"
          pattern="^[-a-zA-Z_\d]+$"
          placeholder="Enter Character, Numbers, Dash, Uderscore"
          required
          ngModel
          #TDCharNumDURef="ngModel"
        />
        <small class="form-text text-danger" *ngIf="TDCharNumDURef.invalid && TDValidationForm.submitted"
          >Must Enter Character, Number, Dash or Uderscore!</small
        >
      </div>
      <div class="form-group">
        <label class="form-control-label" for="TDUrl">Must be a valid url</label>
        <input
          type="text"
          name="TDUrl"
          id="TDUrl"
          class="form-control"
          [class.error]="TDUrlRef.invalid && TDValidationForm.submitted"
          pattern="^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
          placeholder="Enter valid url"
          required
          ngModel
          #TDUrlRef="ngModel"
        />
        <small class="form-text text-danger" *ngIf="TDUrlRef.invalid && TDValidationForm.submitted"
          >Must be a valid url!</small
        >
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary" rippleEffect>Submit</button>
</form>
  `
};
export const snippetCodeReactiveForms: snippetCode = {
  html: `
  <form [formGroup]="ReactiveUserDetailsForm" (ngSubmit)="ReactiveUDFormOnSubmit()">
    <h6 class="mb-2">1. Account Details</h6>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label for="UDUserName">Username</label>
          <input type="text" id="UDUserName" [(ngModel)]="UDForm.userName" formControlName="userName"
            class="form-control"
            [ngClass]="{ 'is-invalid': submitted && ReactiveUDForm.userName.errors }" />
          <div *ngIf="submitted && ReactiveUDForm.userName.errors" class="invalid-feedback">
            <div *ngIf="ReactiveUDForm.userName.errors.required">Username is required</div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="UDEmail">Email</label>
          <input type="text" id="UDEmail" formControlName="email" [(ngModel)]="UDForm.email"
            class="form-control" [ngClass]="{ 'is-invalid': submitted && ReactiveUDForm.email.errors }" />
          <div *ngIf="submitted && ReactiveUDForm.email.errors" class="invalid-feedback">
            <div *ngIf="ReactiveUDForm.email.errors.required">Email is required</div>
            <div *ngIf="ReactiveUDForm.email.errors.email">Email must be a valid email address</div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="UDPassword">Password</label>
          <input type="password" id="UDPassword" formControlName="password" [(ngModel)]="UDForm.password"
            class="form-control"
            [ngClass]="{ 'is-invalid': submitted && ReactiveUDForm.password.errors }" />
          <div *ngIf="submitted && ReactiveUDForm.password.errors" class="invalid-feedback">
            <div *ngIf="ReactiveUDForm.password.errors.required">Password is required</div>
            <div *ngIf="ReactiveUDForm.password.errors.minlength">Password must be at least 6 characters
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="UDConfPassword">Confirm Password</label>
          <input type="password" id="UDConfPassword" formControlName="confPassword"
            [(ngModel)]="UDForm.confPassword" class="form-control"
            [ngClass]="{ 'is-invalid': submitted && ReactiveUDForm.confPassword.errors }" />
          <div *ngIf="submitted && ReactiveUDForm.confPassword.errors" class="invalid-feedback">
            <div *ngIf="ReactiveUDForm.confPassword.errors.required">Confirm Password is required</div>
            <div *ngIf="ReactiveUDForm.confPassword.errors.minlength">Confirm Password must be at least 6
              characters
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <h6 class="mb-2">2. Personal Info</h6>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="UDFirstName">First Name</label>
          <input type="text" id="UDFirstName" [(ngModel)]="UDForm.firstName" formControlName="firstName"
            class="form-control"
            [ngClass]="{ 'is-invalid': submitted && ReactiveUDForm.firstName.errors }" />
          <div *ngIf="submitted && ReactiveUDForm.firstName.errors" class="invalid-feedback">
            <div *ngIf="ReactiveUDForm.firstName.errors.required">First Name is required</div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="UDLastName">Last Name</label>
          <input type="text" id="UDLastName" formControlName="lastName" [(ngModel)]="UDForm.lastName"
            class="form-control"
            [ngClass]="{ 'is-invalid': submitted && ReactiveUDForm.lastName.errors }" />
          <div *ngIf="submitted && ReactiveUDForm.lastName.errors" class="invalid-feedback">
            <div *ngIf="ReactiveUDForm.lastName.errors.required">Last Name is required</div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="UDCountry">Country</label>
          <select id="UDCountry" formControlName="country" class="form-control"
            [ngClass]="{ 'is-invalid': submitted && ReactiveUDForm.country.errors }">
            <option value="USA">USA</option>
            <option value="Germany">Germany</option>
            <option value="Russia">Russia</option>
            <option value="UK">UK</option>
          </select>
          <div *ngIf="submitted && ReactiveUDForm.country.errors" class="invalid-feedback">
            <div *ngIf="ReactiveUDForm.country.errors.required">country is required</div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="UDLanguage">Language</label>
          <select id="UDLanguage" formControlName="language" class="form-control"
            [ngClass]="{ 'is-invalid': submitted && ReactiveUDForm.language.errors }">
            <option selected value="English">English</option>
            <option value="Germany">Germany</option>
            <option value="French">French</option>
            <option value="Portuguese">Portuguese</option>
          </select>
          <div *ngIf="submitted && ReactiveUDForm.language.errors" class="invalid-feedback">
            <div *ngIf="ReactiveUDForm.language.errors.required">language is required</div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="UDAge">Age</label>
          <input type="number" id="UDAge" formControlName="age" [(ngModel)]="UDForm.age"
            class="form-control" [ngClass]="{ 'is-invalid': submitted && ReactiveUDForm.age.errors }" />
          <div *ngIf="submitted && ReactiveUDForm.age.errors" class="invalid-feedback">
            <div *ngIf="ReactiveUDForm.age.errors.required">Age is required</div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="UDPhoneNumber">Phone Number</label>
          <input type="text" id="UDPhoneNumber" formControlName="phoneNumber"
            [(ngModel)]="UDForm.phoneNumber" class="form-control"
            [ngClass]="{ 'is-invalid': submitted && ReactiveUDForm.phoneNumber.errors }" />
          <div *ngIf="submitted && ReactiveUDForm.phoneNumber.errors" class="invalid-feedback">
            <div *ngIf="ReactiveUDForm.phoneNumber.errors.required">Phone Number is required</div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <button class="btn btn-primary" rippleEffect>Register</button>
        </div>
      </div>
    </div>
  </form>
  `,
  ts: `
  public ReactiveUserDetailsForm: FormGroup;
  public ReactiveUDFormSubmitted = false;

  // Reactive User Details form data
  public UDForm = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confPassword: '',
    age: '',
    phoneNumber: ''
  };

  // getter for easy access to form fields
  get ReactiveUDForm() {
    return this.ReactiveUserDetailsForm.controls;
  }

  ReactiveUDFormOnSubmit() {
    this.ReactiveUDFormSubmitted = true;

    // stop here if form is invalid
    if (this.ReactiveUserDetailsForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)');
  }

  // Reactive form initialization
  this.ReactiveUserDetailsForm = this.formBuilder.group({
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confPassword: ['', [Validators.required, Validators.minLength(6)]],
    country: ['', [Validators.required]],
    language: ['', [Validators.required]],
    age: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]]
  });
  `
};
export declare class NgbDate implements NgbDateStruct {
  /**
   * The year, for example 2016
   */
  year: number;
  /**
   * The month, for example 1=Jan ... 12=Dec as in ISO 8601
   */
  month: number;
  /**
   * The day of month, starting with 1
   */
  day: number;
  /**
   * A **static method** that creates a new date object from the `NgbDateStruct`,
   *
   * ex. `NgbDate.from({year: 2000, month: 5, day: 1})`.
   *
   * If the `date` is already of `NgbDate` type, the method will return the same object.
   */
  static from(date?: NgbDateStruct | null): NgbDate | null;
  constructor(year: number, month: number, day: number);
  /**
   * Checks if the current date is equal to another date.
   */
  equals(other?: NgbDateStruct | null): boolean;
  /**
   * Checks if the current date is before another date.
   */
  before(other?: NgbDateStruct | null): boolean;
  /**
   * Checks if the current date is after another date.
   */
  after(other?: NgbDateStruct | null): boolean;
}