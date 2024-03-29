import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    Tree,
    Select,
    Option,
    Cascader,
    Alert,
    Tabs,
    TabPane,
    Step,
    Steps,
    Checkbox,
    CheckboxGroup,
    Upload,
    Timeline,
    TimelineItem,
    Image,
    Footer,
    Carousel,
    CarouselItem,
    Avatar,
    Radio,
    DatePicker,
    Link,
    RadioGroup,
    RadioButton,
    InputNumber,
    Divider,
    Badge,
    Progress,
} from 'element-ui'

Vue.use(Progress)
Vue.use(Badge)
Vue.use(Divider)
Vue.use(InputNumber)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Link)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(Avatar)
Vue.use(CarouselItem)
Vue.use(Carousel)
Vue.use(Footer)
Vue.use(Image)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 将弹框组件全局挂在到VUe原形实例
Vue.prototype.$message = Message
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)

// 设置弹框的提醒时间
Vue.prototype.$message = function (msg) {
    return Message({
        message: msg,
        duration: 1500
    })
}

Vue.prototype.$message.success = function (msg) {
    return Message.success({
        message: msg,
        duration: 1500
    })
}

Vue.prototype.$message.warning = function (msg) {
    return Message.warning({
        message: msg,
        duration: 1500
    })
}


Vue.prototype.$message.error = function (msg) {
    return Message.error({
        message: msg,
        duration: 1500
    })
}

Vue.prototype.$message.info = function (msg) {
    return Message.info({
        message: msg,
        duration: 1500
    })
}