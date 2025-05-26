// export const useApi = () => {

//   const errorMessage = {
//     "401": "Vous n'êtes pas autorisé à accéder à cette ressource. Vérifiez que vous êtes connecté et que vous avez les autorisations nécessaires.",
//     "403": "Vous n'êtes pas autorisé à accéder à cette ressource. Vérifiez que vous êtes connecté et que vous avez les autorisations nécessaires.",
//   }

//   const refreshSubscription = () => {
//     const subscriptionStore = useSubscriptionStore();
//     subscriptionStore.alreadyFetched = false;
//     subscriptionStore.fetchSubscription();
//   }

//   const fetchWithAuthentication = async <T>(endpoint: string, options: RequestInit = {}, forceRefresh: boolean = false) => {
//     const user = useCurrentUser();

//     const token = await user.value?.getIdToken(forceRefresh);
//     if (!token) {
//       throw new Error(errorMessage[403]);
//     }

//     const headers = new Headers(options.headers || {});
//     headers.set('Authorization', `Bearer ${token}`);


//     const response = await fetch(endpoint, { ...options, headers });

//     if (!response.ok) {
//       // Handle ElasticSearch errors
//       const errorData = await response.json();
//       console.error('Response', response, 'ErrorData', errorData, 'Error response:', errorData.message);

//       if (response.status === 400) {
//         throw new Error(errorData.message || 'An error occurred while processing your request.');

//       } else if (response.status === 401) {
//         if (!forceRefresh) {
//           return fetchWithAuthentication(endpoint, options, true);
//         }
//         throw new Error(errorMessage[401]);
//       } else if (response.status === 403) {
//         refreshSubscription();
//         throw new Error(errorMessage[403]);
//       } else if (response.status === 429) {
//         throw new Error('Too many requests. Please try again later.');
//       } else {
//         throw new Error();
//       }
//     } else if (response.status === 204) {
//       return Object.create(null) as T;
//     }

//     return response.json() as Promise<T>;
//   };

//   const fetchFileWithAuthentication = async (endpoint: string, options: RequestInit = {}, forceRefresh: boolean = false) => {
//     const user = useCurrentUser();

//     const token = await user.value?.getIdToken();
//     if (!token) {
//       throw new Error(errorMessage[403]);
//     }

//     const headers = new Headers(options.headers || {});
//     headers.set('Authorization', `Bearer ${token}`);

//     const response = await fetch(endpoint, { ...options, headers });

//     if (!response.ok) {
//       console.error('Error response:', await response.text());
//       if (response.status === 403) {
//         refreshSubscription();
//         throw new Error(errorMessage[403]);
//       } else if (response.status === 401) {
//         if (!forceRefresh) {
//           return fetchFileWithAuthentication(endpoint, options, true);
//         }
//         throw new Error(errorMessage[401]);
//       } else {
//         throw new Error();
//       }
//     }

//     return response.blob();
//   };

//   const fetchAiResponseWithAuthentication = async (
//     endpoint: string,
//     options: RequestInit = {},
//     onMessage: (data: string) => void,
//     forceRefresh: boolean = false
//   ) => {
//     const user = useCurrentUser();

//     const token = await user.value?.getIdToken();
//     if (!token) {
//       throw new Error(errorMessage[403]);
//     }

//     const headers = new Headers(options.headers || {});
//     headers.set('Authorization', `Bearer ${token}`);
//     headers.set('Accept', 'text/event-stream');

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await fetch(endpoint, { ...options, headers, signal });

//     if (!response.ok) {
//       console.error('Error response:', await response.json());
//       if (response.status === 403) {
//         refreshSubscription();
//         throw new Error(errorMessage[403]);
//       } else if (response.status === 401) {
//         if (!forceRefresh) {
//           return fetchAiResponseWithAuthentication(endpoint, options, onMessage, true);
//         }
//         throw new Error(errorMessage[401]);
//       } else {
//         throw new Error('An error occurred while streaming the response.');
//       }
//     }

//     const reader = response.body?.getReader();
//     const decoder = new TextDecoder('utf-8');

//     if (!reader) {
//       throw new Error('Unable to read streaming response.');
//     }

//     let finished = false;

//     let resolveDone: () => void;
//     let rejectDone: (error: Error | unknown) => void;

//     const done = new Promise<void>((resolve, reject) => {
//       resolveDone = resolve;
//       rejectDone = reject;
//     });

//     const readStream = async () => {
//       try {
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) {
//             finished = true;
//             resolveDone();
//             break;
//           }
//           const chunk = decoder.decode(value, { stream: true });
//           onMessage(chunk);
//         }
//       } catch (error: Error | unknown) {
//         if (signal.aborted) {
//           console.log('Streaming aborted by user.');
//           resolveDone();
//         } else {
//           rejectDone(error);
//         }
//       } finally {
//         reader.releaseLock();
//       }
//     };

//     readStream();

//     return {
//       abort: () => {
//         if (!finished) {
//           controller.abort();
//         }
//       },
//       done,
//     };
//   };

//   return { fetchWithAuthentication, fetchFileWithAuthentication, fetchAiResponseWithAuthentication };
// }
