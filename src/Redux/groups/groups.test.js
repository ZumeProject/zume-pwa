import groupsSlice from './index';
const { reducer, actions } = groupsSlice;
const {
  groupsLoaded,
  groupSelected,
  groupCreated,
  groupUpdated,
  groupDeleted
} = actions;

const initialState = {
  current: null,
  list: []
};

describe('Groups reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  const sampleGroupList = [
    {
      group: 1
    },
    { group: 2 }
  ];

  const loadedState = {
    current: null,
    list: sampleGroupList
  };

  it('should load groups', () => {
    expect(reducer(initialState, groupsLoaded(sampleGroupList))).toEqual(
      loadedState
    );
  });

  const loadedAndSelectedState = {
    current: 1,
    list: sampleGroupList
  };
  it('should support selecting a current group', () => {
    expect(reducer(loadedState, groupSelected(1))).toEqual(
      loadedAndSelectedState
    );
  });

  const createdState = {
    current: null,
    list: [...sampleGroupList, { group: 2 }]
  };
  it('should support creating a group', () => {
    expect(reducer(loadedState, groupCreated({ group: 2 }))).toEqual(
      createdState
    );
  });

  const updatedState = {
    current: null,
    list: [...sampleGroupList, { group: 3 }]
  };
  it('should support updating a group', () => {
    expect(
      reducer(
        createdState,
        groupUpdated({ groupIndex: 2, group: { group: 3 } })
      )
    ).toEqual(updatedState);
  });

  it('should support deleting a group', () => {
    expect(reducer(createdState, groupDeleted({ groupIndex: 2 }))).toEqual(
      loadedState
    );
  });
});
