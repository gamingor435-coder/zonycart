import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
  // Main ne aapka token yahan direct daal diya hai
  token: 'skdmwTQkboSTUV6bgWXuRbVfVFYllag17tWyFqB902Zg8haEZJMwraKQgrr6srhIoNOHICRx2a2yP5oN9sC1tNiHWeSKIoklthWluygFafkV5bfHWDc2oetcjyEvtqDS4U83jeCL9HWTReiPb3kG9iFGYB1Di38mmiVFCha1ur1zDp4r8v4d', 
})