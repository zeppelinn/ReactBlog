import { observable, action } from 'mobx'

class UserStore{
    @observable isLogin = true

    @action
    login = () => {

    }

    @action
    logout = () => {
        
    }

}

export default new UserStore()