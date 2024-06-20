import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateParentInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginRequestGraphQl = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponseGraphQl = {
  __typename?: 'LoginResponseGraphQL';
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  token: Scalars['String']['output'];
  userId: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTeacherAvailability: TeacherAvailabilityGraphQl;
  login: LoginResponseGraphQl;
  signupParent: ParentGraphQl;
  updateTeacherAvailability: TeacherAvailabilityGraphQl;
};


export type MutationCreateTeacherAvailabilityArgs = {
  availability: TeacherAvailabilityInput;
  teacherId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  data: LoginRequestGraphQl;
};


export type MutationSignupParentArgs = {
  data: CreateParentInput;
};


export type MutationUpdateTeacherAvailabilityArgs = {
  availability: TeacherAvailabilityInput;
  availabilityId: Scalars['Float']['input'];
  teacherId: Scalars['Float']['input'];
};

export type ParentGraphQl = {
  __typename?: 'ParentGraphQL';
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  parentId: Scalars['Int']['output'];
  profile?: Maybe<ParentProfileGraphQl>;
  userId: Scalars['Int']['output'];
};

export type ParentProfileGraphQl = {
  __typename?: 'ParentProfileGraphQL';
  address?: Maybe<Scalars['String']['output']>;
  biography?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  parentProfileId: Scalars['Int']['output'];
  profilePictureUrl?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get list of all  parents  */
  getParents: Array<ParentGraphQl>;
  /** Get teacher availability */
  getTeacherAvailability: Array<TeacherAvailabilityGraphQl>;
};


export type QueryGetTeacherAvailabilityArgs = {
  teacherId: Scalars['Float']['input'];
};

export type TeacherAvailabilityGraphQl = {
  __typename?: 'TeacherAvailabilityGraphQL';
  endDateTime: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  repeatFrequency: Scalars['String']['output'];
  repeatUntil?: Maybe<Scalars['DateTime']['output']>;
  startDateTime: Scalars['DateTime']['output'];
};

export type TeacherAvailabilityInput = {
  endDateTime: Scalars['DateTime']['input'];
  repeatFrequency: Scalars['String']['input'];
  startDateTime: Scalars['DateTime']['input'];
};

export type LoginMutationVariables = Exact<{
  data: LoginRequestGraphQl;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponseGraphQL', token: string, userId: number, firstName: string, lastName: string } };

export type SignupParentMutationVariables = Exact<{
  data: CreateParentInput;
}>;


export type SignupParentMutation = { __typename?: 'Mutation', signupParent: { __typename: 'ParentGraphQL', parentId: number, firstName: string, lastName: string, userId: number, profile?: { __typename: 'ParentProfileGraphQL', parentProfileId: number, address?: string | null, biography?: string | null, city?: string | null, profilePictureUrl?: string | null, state?: string | null } | null } };

export type GetTeacherAvailabilityQueryVariables = Exact<{
  teacherId: Scalars['Float']['input'];
}>;


export type GetTeacherAvailabilityQuery = { __typename?: 'Query', getTeacherAvailability: Array<{ __typename?: 'TeacherAvailabilityGraphQL', id: number, startDateTime: any, endDateTime: any, repeatFrequency: string, repeatUntil?: any | null }> };

export type CreateTeacherAvailabilityMutationVariables = Exact<{
  teacherId: Scalars['Float']['input'];
  availability: TeacherAvailabilityInput;
}>;


export type CreateTeacherAvailabilityMutation = { __typename?: 'Mutation', createTeacherAvailability: { __typename?: 'TeacherAvailabilityGraphQL', id: number } };

export type UpdateTeacherAvailabilityMutationVariables = Exact<{
  teacherId: Scalars['Float']['input'];
  availabilityId: Scalars['Float']['input'];
  availability: TeacherAvailabilityInput;
}>;


export type UpdateTeacherAvailabilityMutation = { __typename?: 'Mutation', updateTeacherAvailability: { __typename?: 'TeacherAvailabilityGraphQL', id: number, startDateTime: any, endDateTime: any, repeatFrequency: string, repeatUntil?: any | null } };


export const LoginDocument = gql`
    mutation Login($data: LoginRequestGraphQL!) {
  login(data: $data) {
    token
    userId
    firstName
    lastName
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupParentDocument = gql`
    mutation SignupParent($data: CreateParentInput!) {
  signupParent(data: $data) {
    parentId
    firstName
    lastName
    userId
    profile {
      parentProfileId
      address
      biography
      city
      profilePictureUrl
      state
      __typename
    }
    __typename
  }
}
    `;
export type SignupParentMutationFn = Apollo.MutationFunction<SignupParentMutation, SignupParentMutationVariables>;

/**
 * __useSignupParentMutation__
 *
 * To run a mutation, you first call `useSignupParentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupParentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupParentMutation, { data, loading, error }] = useSignupParentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupParentMutation(baseOptions?: Apollo.MutationHookOptions<SignupParentMutation, SignupParentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupParentMutation, SignupParentMutationVariables>(SignupParentDocument, options);
      }
export type SignupParentMutationHookResult = ReturnType<typeof useSignupParentMutation>;
export type SignupParentMutationResult = Apollo.MutationResult<SignupParentMutation>;
export type SignupParentMutationOptions = Apollo.BaseMutationOptions<SignupParentMutation, SignupParentMutationVariables>;
export const GetTeacherAvailabilityDocument = gql`
    query GetTeacherAvailability($teacherId: Float!) {
  getTeacherAvailability(teacherId: $teacherId) {
    id
    startDateTime
    endDateTime
    repeatFrequency
    repeatUntil
  }
}
    `;

/**
 * __useGetTeacherAvailabilityQuery__
 *
 * To run a query within a React component, call `useGetTeacherAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeacherAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeacherAvailabilityQuery({
 *   variables: {
 *      teacherId: // value for 'teacherId'
 *   },
 * });
 */
export function useGetTeacherAvailabilityQuery(baseOptions: Apollo.QueryHookOptions<GetTeacherAvailabilityQuery, GetTeacherAvailabilityQueryVariables> & ({ variables: GetTeacherAvailabilityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeacherAvailabilityQuery, GetTeacherAvailabilityQueryVariables>(GetTeacherAvailabilityDocument, options);
      }
export function useGetTeacherAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeacherAvailabilityQuery, GetTeacherAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeacherAvailabilityQuery, GetTeacherAvailabilityQueryVariables>(GetTeacherAvailabilityDocument, options);
        }
export function useGetTeacherAvailabilitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTeacherAvailabilityQuery, GetTeacherAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeacherAvailabilityQuery, GetTeacherAvailabilityQueryVariables>(GetTeacherAvailabilityDocument, options);
        }
export type GetTeacherAvailabilityQueryHookResult = ReturnType<typeof useGetTeacherAvailabilityQuery>;
export type GetTeacherAvailabilityLazyQueryHookResult = ReturnType<typeof useGetTeacherAvailabilityLazyQuery>;
export type GetTeacherAvailabilitySuspenseQueryHookResult = ReturnType<typeof useGetTeacherAvailabilitySuspenseQuery>;
export type GetTeacherAvailabilityQueryResult = Apollo.QueryResult<GetTeacherAvailabilityQuery, GetTeacherAvailabilityQueryVariables>;
export const CreateTeacherAvailabilityDocument = gql`
    mutation CreateTeacherAvailability($teacherId: Float!, $availability: TeacherAvailabilityInput!) {
  createTeacherAvailability(teacherId: $teacherId, availability: $availability) {
    id
  }
}
    `;
export type CreateTeacherAvailabilityMutationFn = Apollo.MutationFunction<CreateTeacherAvailabilityMutation, CreateTeacherAvailabilityMutationVariables>;

/**
 * __useCreateTeacherAvailabilityMutation__
 *
 * To run a mutation, you first call `useCreateTeacherAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeacherAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeacherAvailabilityMutation, { data, loading, error }] = useCreateTeacherAvailabilityMutation({
 *   variables: {
 *      teacherId: // value for 'teacherId'
 *      availability: // value for 'availability'
 *   },
 * });
 */
export function useCreateTeacherAvailabilityMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeacherAvailabilityMutation, CreateTeacherAvailabilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeacherAvailabilityMutation, CreateTeacherAvailabilityMutationVariables>(CreateTeacherAvailabilityDocument, options);
      }
export type CreateTeacherAvailabilityMutationHookResult = ReturnType<typeof useCreateTeacherAvailabilityMutation>;
export type CreateTeacherAvailabilityMutationResult = Apollo.MutationResult<CreateTeacherAvailabilityMutation>;
export type CreateTeacherAvailabilityMutationOptions = Apollo.BaseMutationOptions<CreateTeacherAvailabilityMutation, CreateTeacherAvailabilityMutationVariables>;
export const UpdateTeacherAvailabilityDocument = gql`
    mutation UpdateTeacherAvailability($teacherId: Float!, $availabilityId: Float!, $availability: TeacherAvailabilityInput!) {
  updateTeacherAvailability(
    teacherId: $teacherId
    availabilityId: $availabilityId
    availability: $availability
  ) {
    id
    startDateTime
    endDateTime
    repeatFrequency
    repeatUntil
  }
}
    `;
export type UpdateTeacherAvailabilityMutationFn = Apollo.MutationFunction<UpdateTeacherAvailabilityMutation, UpdateTeacherAvailabilityMutationVariables>;

/**
 * __useUpdateTeacherAvailabilityMutation__
 *
 * To run a mutation, you first call `useUpdateTeacherAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeacherAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeacherAvailabilityMutation, { data, loading, error }] = useUpdateTeacherAvailabilityMutation({
 *   variables: {
 *      teacherId: // value for 'teacherId'
 *      availabilityId: // value for 'availabilityId'
 *      availability: // value for 'availability'
 *   },
 * });
 */
export function useUpdateTeacherAvailabilityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeacherAvailabilityMutation, UpdateTeacherAvailabilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeacherAvailabilityMutation, UpdateTeacherAvailabilityMutationVariables>(UpdateTeacherAvailabilityDocument, options);
      }
export type UpdateTeacherAvailabilityMutationHookResult = ReturnType<typeof useUpdateTeacherAvailabilityMutation>;
export type UpdateTeacherAvailabilityMutationResult = Apollo.MutationResult<UpdateTeacherAvailabilityMutation>;
export type UpdateTeacherAvailabilityMutationOptions = Apollo.BaseMutationOptions<UpdateTeacherAvailabilityMutation, UpdateTeacherAvailabilityMutationVariables>;