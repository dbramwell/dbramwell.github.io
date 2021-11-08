export interface StackoverflowData {
  items: [StackoverflowAnswer]
}

export interface StackoverflowAnswer {
  owner: StackoverflowOwner
}

export interface StackoverflowOwner {
  reputation: number
  user_id: number
  profile_image: URL
  link: URL

}